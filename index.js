const express = require('express');
const path = require('path')
const cookieParser = require("cookie-parser")



// Local Modules
const { connectDB } = require('./db');
const { URL } = require("./models/shiftUrlModel")
const { userRouter } = require("./routers/users")
const { URLRouter } = require("./routers/shifturl")
const { restrictToUserOnly } = require("./middlewares/auth")

const app = express();
app.set('view engine', 'ejs')
app.set("views", path.resolve("./views"))

connectDB();

// Middlewares Used
app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())
// app.use(restrictToUserOnly())
app.use("/user", userRouter)
app.use("/api", restrictToUserOnly, URLRouter )

app.get("/signup", (req, res) => {
  res.render("signup")
})

app.get("/login", (req, res) => {
  res.render("login")
})


app.get('/', restrictToUserOnly,async (req, res) => {
  try {
    // Fetch all URLs (you might want to fetch URLs specific to a user in a real application)
    const user = req.user
    const urls = await URL.find({userName: user.userName });
    if( !urls ){
      res.render('index-no-urls')
    }
    res.render('index', { urls });
  }
   catch (error) {
    res.status(500).send('Error loading the home page.');
  }
});









// Connecting to server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`The server is listening at PORT: ${PORT}`);
});
