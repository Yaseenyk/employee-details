const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const db = require("./Database/db");
const authRoutes = require('./routes/authRoutes');
require("./config/passport")(passport);
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',(req, res)=>{
    res.render('signin')
})
app.use('/auth',authRoutes);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(8000, () => {
  console.log("server started");
});
