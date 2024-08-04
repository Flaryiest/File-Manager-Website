bcrypt = require("bcryptjs")

async function getHomePage(req, res) {
    res.render("index")
}

async function getSignUpForm(req, res) {
    res.render("signup-form")
}

async function signUp(req, res, next) {
    try {

    } catch(err) {
        return next(err)
    }

    res.redirect("/")
}

module.exports = {getHomePage, getSignUpForm, signUp}