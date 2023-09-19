const Performance = require("../models/Performance");

exports.dasboardPage = async (req, res) => {
  try {
    const empId = req.session.EmployeeId;
    const performanceData = await Performance.find({
      $and: [
        { "feedback.reviewer": empId },
        { "feedback.feedbackDone": false },
      ],
    }).populate("feedback.reviewer");
    let performanceId;
    performanceData.forEach((performance) => {
      performance.feedback.forEach((feedback) => {
      performanceId = feedback._id;
    });
    });
    res.render("employee", { performanceData, performanceId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.feedBack = async (req, res) => {
  const performanceId = req.body.performanceId;
  const feedBackData = req.body.feedback;
  console.log(performanceId) 

  try {
    // Find the specific performance record using its _id and the nested _id of the feedback item
    const performance = await Performance.findOneAndUpdate(
      { "feedback._id": performanceId },
      { $set: {
        "feedback.$.feedbackText": feedBackData,
        "feedback.$.feedbackDone": true, // Set feedbackDone to true
      } },
      { new: true }
    );

    if (!performance) {
      // Handle the case where the performance record with the specified feedback _id is not found
      return res.status(404).json({ message: 'Performance record not found' });
    }
    
    // Return the updated performance record
    res.redirect('/employee/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
