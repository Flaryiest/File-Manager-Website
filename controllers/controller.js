const db = require("../db/queries")
const bcrypt = require("bcryptjs")
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const multer = require("multer")
const upload = multer({dest: "uploads/"})

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
    console.log(req.body.username, req.body.password)
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    }) (req, res, next)
}


async function getDrivePage(req, res) {
    userFolders = await db.getFolders(req.user.id)
    console.log(userFolders)
    if (!(req.user)) {
        res.redirect("/")
    }
    res.render("drive", {folders: userFolders})
}

async function createFolder(req, res) {
    console.log(req.body.folderName)
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
    console.log(req.file, "test")

    res.redirect("/drive")
}

module.exports = {getHomePage, getSignUpForm, signUp, getLoginForm, login, getDrivePage, createFolder, logOut, getFolderPage, uploadFile}