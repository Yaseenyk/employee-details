const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['admin', 'employee'],
        default: 'employee',
      },
});

const Employee = mongoose.model('Employee',employeeSchema);

module.exports = Employee;