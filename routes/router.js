const express = require("express")
const router = express.Router()
const controller = require("../controllers/controller")


router.get("/", controller.getHomePage)

router.get("/signup", controller.getSignUpForm)

router.post("/signup", controller.signUp)

module.exports = router

