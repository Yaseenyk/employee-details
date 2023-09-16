const Employee = require('../modules/Employee');

const addEmployee = async(req,res)=>{
    try {
        const employees = await Employee.find({ role: 'employee' });
        res.render('admin', { employees });
     } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
     }
};



module.exports = {
    addEmployee
}