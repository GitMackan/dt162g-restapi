// Import libriaries
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv/config');

let PORT = process.env.PORT || 5000;

// Middlewares
app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
	next();
});

app.get('/', (req, res, next) => {

    res.status(200).json({
        status: 'success',
        data: {
            name: 'Marcus App',
            version: '0.1.0'
        }
    });
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Import routes
const coursesRoutes = require('/routes/courses.js');

app.use('/courses', coursesRoutes);

// Anslut till Databas
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('Connected to DB!');
});

app.listen(PORT);