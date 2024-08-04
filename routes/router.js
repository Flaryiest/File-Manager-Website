const express = require("express")
const router = express.Router()
const controller = require("../controllers/controller")


router.get("/", controller.getHomePage)

router.get("/signup", controller.getSignUpForm)

router.post("/signup", controller.signUp)

router.get("/login", controller.getLoginForm)

router.post("/login", controller.login)

router.get("/upload", controller.getUploadPage)

router.get("/drive/:folderID", controller.getFolderPage)

router.post("/drive/create", controller.createFolder)

router.get("/drive", controller.getDrivePage)

router.get("/logout", controller.logOut)

module.exports = router

