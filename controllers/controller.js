const db = require("../db/queries")
const bcrypt = require("bcryptjs")
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;


async function getHomePage(req, res) {
    console.log(await db.getAllUsers())
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
    res.render("upload")
}

async function getDrivePage(req, res) {
    res.render("drive")
}

module.exports = {getHomePage, getSignUpForm, signUp, getLoginForm, login, getUploadPage, getDrivePage}