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

router.post("/drive/move/:folderID/:fileID", controller.moveFile)

router.get("/drive/folder/:folderID", controller.getFolder)

router.get("/drive/delete/folder/:folderID", controller.deleteFolder)

router.get("/drive/delete/:fileName", controller.deleteFile)

router.get("/drive/download/:fileName", controller.downloadFile)

router.get("/drive/:folderID", controller.getFolderPage)

router.post("/drive/create", controller.createFolder)

router.get("/drive", controller.getDrivePage)

router.get("/logout", controller.logOut)



module.exports = router

