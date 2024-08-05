const express = require("express")
const router = express.Router()
const controller = require("../controllers/controller")
const multer = require("multer")
const upload = multer({dest: "uploads/"})

router.get("/", controller.getHomePage)

router.get("/signup", controller.getSignUpForm)

router.post("/signup", controller.signUp)

router.get("/login", controller.getLoginForm)

router.post("/login", controller.login)


router.post("/upload", upload.single('file'), controller.uploadFile)

router.get("/drive/:folderID", controller.getFolderPage)

router.post("/drive/create", controller.createFolder)

router.get("/drive", controller.getDrivePage)

router.get("/logout", controller.logOut)


module.exports = router

