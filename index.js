const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const studentRoutes = require('./routes/studentRoutes.js');
const connectDb = require('./config/connectDB.js');
const { MulterError } = require('multer');

connectDb();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.use(cors());
app.use('/api', studentRoutes);

// Multer error middleware
app.use((error, req, res, next) => {
    if (error instanceof MulterError) {
        return res.status(400).send(`Image error: ${error.message} : ${error.code}`);
    } else if (error) {
        return res.status(500).send(`Somthing went wrong: ${error.message}`);
    }
    next();
})

app.get('/', (req, res) => {
    console.log("Server is running");
    res.send("Server is running");
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);

})