const express = require("express")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const router = require("./routes/router.js")
const path = require("path")
const app = express()
const {PrismaSessionStore} = require("@quixo3/prisma-session-store")
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient({})
app.use(express.static(path.join(__dirname, "/public")))
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.use(express.urlencoded({extended: false}))
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use(
    expressSession({
      cookie: {
       maxAge: 7 * 24 * 60 * 60 * 1000
      },
      secret: 'spicy',
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(
        new PrismaClient(),
        {
          checkPeriod: 2 * 60 * 1000,
          dbRecordIdIsSessionId: true,
          dbRecordIdFunction: undefined,
        }
      )
    })
  );

app.use("/", router)

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {

        } catch {
            
        }
    })
)


app.listen(3000, () => {console.log("Listening on port 3000")})