const mongoose = require('mongoose');

const performanceSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
      },
      feedback: [
        {
          employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee',
          },
          feedbackText: String,
        },
      ],
});

const Performance = mongoose.model('Performance',performanceSchema);

module.exports = Performance;