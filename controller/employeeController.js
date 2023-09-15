const Employee = require('../modules/Employee');

const addEmployee = async(req,res)=>{
    const {name,age,designation} = req.body;
    
    res.status(200).json({updated:'Successfull', data : req.body})
};


module.exports = {
    addEmployee
}