const Employee = require("../models/Employee");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require('bcrypt');

exports.loginPage = async(req,res)=>{
  res.render('signin');
}

exports.signIn = async (req, res) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        // console.log("line 10",err)
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      req.login(user, async (err) => {
        if (err) {
            // console.log(err)
          return res.status(500).json({ message: "Internal Server Error" });
        }
        const token = jwt.sign({ userId: user._id }, config.secrectKey, {
          expiresIn: "1h",
        });
        // console.log(user.role)
        if(user.role !=='employee'){
            return res.redirect('/admin/dashboard');
        }else{
          
          req.session.EmployeeId = user.id;
          // console.log(req.session.EmployeeId)
          return res.redirect('/employee/dashboard');

        }
        // return res.status(200).json({ message: "Successfully Login", user, token });
      });
    })(req, res);
  };
  

exports.signUp = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const existingUser = await Employee.findOne({ username });
    
        if (existingUser) {
          return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);
        const newUser = new Employee({
          username,
          password: hashedPassword,
          role:role
        });
    
        await newUser.save();
    
        const token = jwt.sign({ userId: newUser._id }, config.secrectKey, {
          expiresIn: '1h',
        });
    
        return res.status(201).json({ message: 'User registered', user: newUser, token });
      } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error',err });
      }
};

exports.logout = async (req, res) => {};
