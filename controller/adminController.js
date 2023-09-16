const Performance = require('../modules/Performance');
const Employee = require('../modules/Employee');
const { ObjectId } = require('mongodb');

// View all employees and their performance reviews
const viewEmployeePerformance = async (req, res) => {
  try {
    const employees = await Employee.find({ role: 'employee' }).populate('performanceReviews');
    res.render('admin', { employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a new performance review
const addPerformanceReview = async (req, res) => {
  try {
    const { employeeId, title, description } = req.body;

    // Create a new performance review
    const performanceReview = new Performance({
      title,
      description,
      assignedTo: employeeId,
    });

    await performanceReview.save();
    res.redirect('/admin'); // edirect to the admin page
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an existing performance review
const updatePerformanceReview = async (req, res) => {
  try {
    const { performanceReviewId, feedbackText } = req.body;

    // Find the performance review by ID and update the feedback
    const performanceReview = await Performance.findByIdAndUpdate(
      performanceReviewId,
      { $push: { feedback: { employee: req.user.id, feedbackText } } },
      { new: true }
    );

    if (!performanceReview) {
      return res.status(404).json({ error: 'Performance review not found' });
    }

    res.redirect('/admin'); // Redirect to the admin page
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const getPerformanceReviews = async (req, res) => {
    try {
      const { employeeId } = req.params;
    //   console.log(employeeId) // Extract the employee ID from the request params
      
      // Assuming you have a 'performanceReview' property in your Employee model

      const employee = await Performance.find({assignedTo:employeeId} );
        console.log(employee)
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      // Assuming 'performanceReview' is a property of the Employee model
    //   const performanceReview = employee.performanceReview;
  
      // Respond with the performance review data
    //   console.log(employee)
      return res.status(200).json(employee);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports = {
    viewEmployeePerformance,
    addPerformanceReview,
    updatePerformanceReview,
    getPerformanceReviews,
  };