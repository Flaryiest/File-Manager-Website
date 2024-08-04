const express = require("express")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const router = require("./routes/router.js")
const path = require("path")
const app = express()


app.use(express.static(path.join(__dirname, "/public")))
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.use(session({secret: "cats", resave: false, saveUnitialized: false}))
app.use(passport.session())
app.use(express.urlencoded({extended: false}))


app.use("/", router)



app.listen(3000, () => {console.log("Listening on port 3000")})