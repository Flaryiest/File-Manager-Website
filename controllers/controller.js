const db = require("../db/queries")
const bcrypt = require("bcryptjs")
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;


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

async function getUploadPage(req, res) {
    if (!(req.user)) {
        res.redirect("/")
    }
    res.render("upload")
}

async function getDrivePage(req, res) {
    if (!(req.user)) {
        res.redirect("/")
    }
    res.render("drive")
}

async function createFolder(req, res) {
    console.log(req.body.folderName)
    console.log(req.user)
    db.createFolder(req.user.id, req.body.folderName)
    res.redirect("/drive")
}

module.exports = {getHomePage, getSignUpForm, signUp, getLoginForm, login, getUploadPage, getDrivePage, createFolder}