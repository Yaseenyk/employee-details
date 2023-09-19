const mongoose = require('mongoose');

const performanceSchema = mongoose.Schema({
    title: {
        type: String,
        // required: true,
      },
      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
      },
      feedback: [
        {
          reviewer: { // Add a reference to the reviewer (Employee)
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee',
            required: true,
        },
        employeeToReview: { // Add a reference to the employee to review (Employee)
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee',
            required: true,
        },
          feedbackText: String,
          feedbackDone:{
            type:Boolean,
            default: false
          }
        },
      ],
});

const Performance = mongoose.model('Performance',performanceSchema);

module.exports = Performance;