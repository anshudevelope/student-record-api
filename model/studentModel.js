const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },
    profilePic: {
        type: String,
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;