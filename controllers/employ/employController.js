// employController.js - This is where you define the controller functions
const EmployModel = require('../../models/employ/employModel');

const addEmploy = async (req, res) => {
    try {
        const {
            username,
            name,
            email,
            phoneNumber,
            occupation,
            address,
            password,
            userType
        } = req.body; // Assuming these fields are in the request body

        const newEmployData = {
            username,
            name,
            email,
            phoneNumber,
            occupation,
            address,
            password,
            userType
        };

        const employId = await EmployModel.addEmploy(newEmployData);

        res.status(201).json({response:true, id: employId });
    } catch (err) {
        
        res.status(500).json({ response: false, message: err.message }); // Respond with the error message
    }
    
};
const employList = async (req, res) => {
    try {
        const employees = await EmployModel.getEmployees();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const updateEmploy = async (req, res) => {
    try {
        const employId = req.params.id; // Assuming the employId is in the URL parameters
        const {
            username,
            name,
            email,
            phoneNumber,
            occupation,
            address,
            password,
            userType
        } = req.body;

        const updatedEmployData = {
            username,
            name,
            email,
            phoneNumber,
            occupation,
            address,
            password,
            userType
        };

        const success = await EmployModel.updateEmploy(employId, updatedEmployData);

        if (success) {
            res.status(200).json({ response: true, message: 'Employee updated successfully' });
        } else {
            res.status(404).json({ response: false, message: 'Employee not found' });
        }
    } catch (err) {
        res.status(500).json({ response: false, message: err.message });
    }
};
const deleteEmployee = async (req, res) => {
    try {
        const employId = req.params.id; // Retrieve the employId from URL parameters

        const deleted = await EmployModel.deleteEmploy(employId);

        if (deleted) {
            res.status(200).json({ success: true, message: 'Employee deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Employee not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
module.exports = {
    addEmploy,employList,updateEmploy,deleteEmployee
};
