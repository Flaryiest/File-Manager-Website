const express = require("express")
const router = express.Router()
const controller = require("../controllers/controller")


router.get("/", controller.getHomePage)

router.get("/signup", controller.getSignUpForm)

router.post("/signup", controller.signUp)

router.get("/login", controller.getLoginForm)

router.post("/login", controller.login)

router.get("/upload", controller.getUploadPage)

module.exports = router

