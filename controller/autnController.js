const Employee = require("../modules/Employee");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const passport = require("passport");
const bycrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    console.log(`${username},${password},${role}`);
    const existingUser = await Employee.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: `${username} already Exists` });
    }
    const hashedPassword = await bycrypt.hash(password, 10);

    const newEmployee = new Employee({
      username,
      password: hashedPassword,
      role,
    });
    const data = await newEmployee.save();

    const token = jwt.sign(
      {
        id: data._id,
        username: data.username,
        role: data.role,
      },
      config.secrectKey,
      {
        expiresIn: "1h",
      }
    );

    res
      .status(201)
      .json({ message: `${username} Created Successfully`, token });
  } catch (err) {
    console.log(err);
    res.send(500).json({ message: "Registration Failed" });
  }
};

exports.login = async (req, res,next) => {
    
  passport.authenticate('local',{session:false}, (err,user,info)=>{
    
    if(err){
        return res.status(500).json({message:'Authentication Failed',error:err})
    }
    if(!user){
        return res.status(401).json({message:'User Unauthorized'});
    }
    req.login(user,{session:false},(loginErr)=>{
        if(loginErr){
            return res.status(500).json({
                message:'Authentication Error'
            })
        }
        const token = jwt.sign(
            {
              id: user._id,
              username: user.username,
              role: user.role,
            },
            config.secrectKey,
            {
              expiresIn: "1h",
            }
          );
          res.cookie('token', token, { httpOnly: true });
          
          // return res.json({message:'Authentication Successful',token,role:user.role})
          // Determine which view to render based on the user's role
      if (user.role === 'admin') {
        return res.render('admin.ejs', { token, role: user.role });
      } else {
        return res.render('employee.ejs', { token, role: user.role });
      }

    })
  })(req,res,next);
};

exports.signin = async(req,res)=>{
    res.render('signin')
}

exports.logout = async (req,res)=>{
  res.clearCookie('token');
  res.redirect('/auth/signin');
}

exports.deleteEmployee = async (req, res) => {
  try {
    const { username } = req.body;

    // Check if the user making the request is an admin
    if (req.role === 'admin') {
      return res.status(403).json({ message: 'Permission denied. Only admin can delete employees.' });
    }

    // Find the employee by username
    const employeeToDelete = await Employee.findOne({ username });

    if (!employeeToDelete) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Delete the employee
    await Employee.deleteOne({ _id: employeeToDelete._id });

    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting employee' });
  }
};

exports.addEmployee = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    console.log(`${username},${password},${role}`);
    const existingUser = await Employee.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: `${username} already Exists` });
    }
    const hashedPassword = await bycrypt.hash(password, 10);

    const newEmployee = new Employee({
      username,
      password: hashedPassword,
      role,
    });
    const data = await newEmployee.save();

    const token = jwt.sign(
      {
        id: data._id,
        username: data.username,
        role: data.role,
      },
      config.secrectKey,
      {
        expiresIn: "1h",
      }
    );

    res.redirect('/admin')
  } catch (err) {
    console.log(err);
    res.send(500).json({ message: "Registration Failed" });
  }
};