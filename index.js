const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const db = require("./Database/db");
const authRoutes = require('./routes/authRoutes');
const session = require('express-session'); 
const config = require('./config/config');
const cors = require('cors');
const cookieParser = require("cookie-parser");
require("./config/passport")(passport);
const adminRoutes = require('./routes/adminRoutes')
const employeeRoutes = require('./routes/employeeRoutes');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: config.secrectKey, 
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  }
}));

app.use(passport.initialize());
// app.use('/',(req,res)=>{
//     res.render('signin');
// })
app.use('/auth', authRoutes);
app.use('/admin',adminRoutes);
app.use('/employee',employeeRoutes);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
