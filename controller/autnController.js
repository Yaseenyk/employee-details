const Employee = require('../modules/Employee');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const passport = require('passport');
const bycrypt = require('bcrypt');

exports.signup = async (req, res)=>{
    try{
        const {username,password,role}= req.body;
        console.log(`${username},${password},${role}`);
        const existingUser = await Employee.findOne({username});
        if(existingUser){
            return res.status(400).json({message: `${username} already Exists`});
        }
        const hashedPassword = await bycrypt.hash(password,10);

        const newEmployee = new Employee({
            username,
            password:hashedPassword,
            role,
        })
        const data = await newEmployee.save();

        const token = jwt.sign({
            id:data._id,
            username:data.username,
            role:data.role,
        },
        config.secrectKey,
            {
                expiresIn:'1h'
            }
        )

        res.status(201).json({message:`${username} Created Successfully`,token});
    }catch(err){
        console.log(err);
        res.send(500).json({message:'Registration Failed'})
    }
    
}

exports.login = async(req,res)=>{
    res.send('login')
}