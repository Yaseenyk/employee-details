const Employee = require("../modules/Employee");

exports.addEmployee = async (req, res) => {
  try {
    const employees = await Employee.find({ role: "employee" });
    res.render("admin", { employees });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateEmployee = async (req, res) => {
    try {
      const { oldUsername, newUsername } = req.body; // Updated variable names
  
      const updatedEmployee = await Employee.findOneAndUpdate(
        { username: oldUsername },
        { username: newUsername },
        { new: true }
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ error: "Employee not Found" });
      }
  
      return res.redirect('/admin');
    } catch (err) {
      console.error(err); // Use console.error to log errors
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

// module.exports = {
//   addEmployee,
//   updateEmployee,
// };
