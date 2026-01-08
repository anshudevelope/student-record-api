const Student = require('../model/studentModel.js');


// Get all students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ success: true, size: students.length, data: students });
    } catch (error) {
        console.log(error.message, "error fetching students");
        res.status(500).json({ success: false, message: error.message });
    }
}

// get student by ID
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        console.log(error.message, "error fetching student by ID");
        res.status(500).json({ success: false, message: error.message });
    }
}

// Create a new student
const createStudent = async (req, res) => {
    try {
        const studentData = req.body;
        const newStudent = await Student.create(studentData);
        res.status(201).json({ success: true, data: newStudent, message: "Student created successfully" });
    } catch (error) {
        console.log(error.message, "error creating student");
        res.status(400).json({ success: false, message: error.message });
    }
}

// Update student by ID
const updateStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const studentData = req.body;
        const updatedStudent = await Student.findByIdAndUpdate(id, studentData, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }
        res.status(200).json({ success: true, data: updatedStudent, message: "Student updated successfully" });
    } catch (error) {
        console.log(error.message, "error updating student by ID");
        res.status(400).json({ success: false, message: error.message });
    }
}

// Delete student by ID
const deleteStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }
        res.status(200).json({ success: true, data: deletedStudent, message: "Student deleted successfully" });
    } catch (error) {
        console.log(error.message, "error deleting student by ID");
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudentById,
    deleteStudentById
};


