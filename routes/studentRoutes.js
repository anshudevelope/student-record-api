const express = require('express');
const router = express.Router();
const Student = require('../model/studentModel');
const { createStudent, getStudents, getStudentById, updateStudentById, deleteStudentById } = require('../controller/studentController.js');
const { createStudentSchema } = require('../validators/studentValidator.js');
const validateRequest = require('../middleware/validation.js');

// Create a new student
router.post('/students/add', validateRequest(createStudentSchema), createStudent);

// Get all students
router.get('/students', getStudents);

// Get a student by ID
router.get('/students/:id', getStudentById);

// Update a student by ID
router.put('/students/:id', validateRequest(createStudentSchema), updateStudentById);

// Delete a student by ID
router.delete('/students/:id', deleteStudentById);

module.exports = router;