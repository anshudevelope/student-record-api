const Student = require('../model/studentModel.js');
const fs = require('fs')
const path = require('path')

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
        const file = req.file;
        // const newStudent = await Student.create(studentData);
        const newStudent = new Student(studentData);
        if (file) {
            newStudent.profilePic = file.filename;
        }
        await newStudent.save();
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

        const file = req.file;

        const existingStudent = await Student.findById(id);

        if (!existingStudent) {
            if (file.filename) {
                const filePath = path.join('./uploads', file.filename);
                fs.unlink(filePath, (err) => {
                    if (err) console.log('Failed to delete image: ', err)
                })
            }
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        if (file) {
            if (existingStudent.profilePic) {
                const oldFilePath = path.join('./uploads', existingStudent.profilePic);
                fs.unlink(oldFilePath, (err) => {
                    if (err) console.log('Failed to delete old image: ', err)
                })
            }
            studentData.profilePic = file.filename;
        }


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
        if (deletedStudent.profilePic) {
            const filePath = path.join('./uploads', deletedStudent.profilePic);
            fs.unlink(filePath, (err) => {
                if (err) console.log('Failed to delete: ', err)
            })
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


