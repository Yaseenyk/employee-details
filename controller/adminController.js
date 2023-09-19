const Employee = require('../models/Employee');
const Performance = require('../models/Performance');


exports.adminPage = async (req, res)=>{
    const employees = await Employee.find({role:'employee'});
    const employeesWithFeedback = await Performance.distinct('reviewer', {
        feedback: { $exists: true, $ne: [] },
    });
    console.log(employeesWithFeedback)
    return res.render('admin',{employees, employeesWithFeedback })
}

exports.deleteEmployee = async(req,res)=>{
    
        const { id } = req.params; 
        try {
            await Employee.findByIdAndDelete(id);
            res.redirect('/admin/dashboard');
        } catch (err) {
            console.log(err);
            res.redirect('/admin/dashboard');
        }
}

exports.updateEmployee = async(req,res) =>{
    try {
        const { id } = req.params;
        const { username } = req.body;

        // Find the employee by ID and update the username
        const employee = await Employee.findByIdAndUpdate(id, { username }, { new: true });

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.redirect('/admin/dashboard'); // Redirect to the admin dashboard
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.showPerformance = async(req,res)=>{
    // console.log(req.params.id);
    // res.status(200).json({message:'Response Sent'})
    
    const id = req.params.id;
    
    const employees = await Employee.find({role:'employee'});
    
    const performance = await Performance.find({assignedTo:id});
    // console.log(performance);
    if(performance.length>0){
        // res.render('admin', { performance, employees });
        res.json(performance);
    }else{
        res.status(500).json({message:'No Data Found'})
    }
    
}

exports.addPerformance = async(req,res)=>{
    try{
        // console.log(req.body);
    const employeeId = req.body.employeeId;
    const performanceData = req.body.performanceData;
    const performance = new Performance({
        assignedTo:employeeId,
        title:performanceData,
        feedback:[],
    })

    await performance.save();

    res.redirect('/admin/dashboard')
    }catch(error){
        console.log(error);
        res.redirect('/admin/dashboard')
    }
    
}

exports.assignEmployee =  async(req,res)=>{
    try {
        const assignedTo = req.body.assignedTo;
        const reviewer = req.body.reviewer;
        const query = { assignedTo: assignedTo };

        const updatedPerformance = await Performance.findOneAndUpdate(
            query,
            {
                $push: {
                    feedback: {
                        reviewer: reviewer,
                        employeeToReview: assignedTo,
                    }
                }
            },
            { new: true }
        );

        if (updatedPerformance) {
            console.log(updatedPerformance)
            // Successfully updated the document
            res.redirect('/admin/dashboard')
        } else {
            // No matching document found
            res.redirect('/admin/dashboard')
        }
    } catch (error) {
        console.error(error);
        res.redirect('/admin/dashboard')
    }
}