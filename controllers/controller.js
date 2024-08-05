const db = require("../db/queries")
const bcrypt = require("bcryptjs")
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const multer = require("multer")
const upload = multer({dest: "uploads/"})
require("dotenv").config()
const {createClient} = require("@supabase/supabase-js")
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
const path = require("path")
const fs = require("fs")
const stream = require("stream")

async function getHomePage(req, res) {
    res.render("index")
}

async function getSignUpForm(req, res) {
    res.render("signup-form")
}

async function signUp(req, res, next) {
    try {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            await db.createUser(req.body.username, req.body.email, hashedPassword)
          });
    } catch(err) {
        return next(err)
    }

    res.redirect("/")
}

async function getLoginForm(req, res) {
    res.render("login-form")
}

async function login(req, res, next) {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    }) (req, res, next)
}


async function getDrivePage(req, res) {
    if (!(req.user.id)) {
        res.redirect("/")
    }
    userFolders = await db.getFolders(req.user.id)
    userFiles = await db.getFiles(req.user.id)


    res.render("drive", {folders: userFolders, files: userFiles})
}

async function createFolder(req, res) {

    db.createFolder(req.user.id, req.body.folderName)
    res.redirect("/drive")
}

async function logOut(req, res) {
    req.logout((err) => {
        if (err) {
        return next(err);
        }
        res.redirect("/");
    });
}

async function getFolderPage(req, res) {
    folder = await db.getFolder(req.params.folderID)
    res.render("folder", {folder: folder})
}

async function uploadFile(req, res, next) {
    const file = req.file
    const filePath = 'public/' + req.file.originalname
    try {
        const fileContent = fs.readFileSync(file.path)
        const {data, error } = await supabase.storage.from("files").upload(filePath,  fileContent, {
            cacheControl: "3600",
            upsert: false
        })
        if (error) {
            throw(error)
        }
    } catch(err) {
        console.log(err)
    }
    await db.addFile(req.user.id, req.file.originalname)
    res.redirect("/drive")
}

async function downloadFile(req, res, next) {
    const filePath = 'public/' + req.params.fileName
    try {
        const {data, error } = await supabase.storage.from("files").download(filePath)
        if (error) {
            throw(error)
        }
        const arrayBuffer = await data.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        res.setHeader('Content-Disposition', `attachment; filename=${req.params.fileName}`);
        res.setHeader('Content-Type', 'application/octet-stream');
        const readableStream = new stream.Readable()
        readableStream._read = () => {}
        readableStream.push(buffer)
        readableStream.push(null)
        readableStream.pipe(res)
    } catch(err) {
        throw(err)
    }
}

async function deleteFile(req, res) {
    const file = await db.findFile(req.params.fileName)
    const filePath = "public/" + file.fileName
    console.log(filePath)
    db.deleteFile(req.params.fileName)
    try {
        const {data, error} = await supabase.storage.from("files").remove([filePath])
        if (error) {
            console.log(error)
        }
    } catch(err) {
        throw(err)
    }

    res.redirect("/drive")
}

async function deleteFolder(req, res) {
    console.log(req.params.folderID)
    await db.deleteFolder(req.params.folderID)
    res.redirect("/drive")
}


module.exports = {getHomePage, getSignUpForm, signUp, getLoginForm, login, getDrivePage, createFolder, logOut, getFolderPage, uploadFile, downloadFile, deleteFile, deleteFolder}