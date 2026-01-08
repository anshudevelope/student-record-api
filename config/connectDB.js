const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = () => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Database connected");
    }).catch((err) => {
        console.log("Database connection error: ", err);
    });
}

module.exports = connectDb;