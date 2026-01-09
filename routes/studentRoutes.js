const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Student = require('../model/studentModel');
const { createStudent, getStudents, getStudentById, updateStudentById, deleteStudentById } = require('../controller/studentController.js');
const { createStudentSchema } = require('../validators/studentValidator.js');
const validateRequest = require('../middleware/validation.js');


//  Multer Code

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const newFileName = Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    },
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error("Only Images are allowed"), false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 3 // 3MB
    }
})

// Create a new student
router.post('/students/add', validateRequest(createStudentSchema), upload.single('profilePic'), createStudent);

// Get all students
router.get('/students', getStudents);

// Get a student by ID
router.get('/students/:id', getStudentById);

// Update a student by ID
router.put('/students/:id', validateRequest(createStudentSchema), upload.single('profilePic'), updateStudentById);

// Delete a student by ID
router.delete('/students/:id', deleteStudentById);

module.exports = router;