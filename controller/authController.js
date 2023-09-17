const Employee = require("../models/Employee");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.signIn = async (req, res) => {
  passport.authenticate("local", (err, res, next) => {
    console.log("Response is : ", err, res);
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!user) {
      res.status(401).json({ message: info.message });
    }
    req.LogIn(user, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      const token = jwt.sign({ userId: user._id }, config.secrectKey, {
        expiersIn: "1h",
      });
      return res.status(200).json({message:"Successfully Login",user,token})
    });
  })(req,res,next)
};

exports.signUp = async (req, res) => {};

exports.logout = async (req, res) => {};
