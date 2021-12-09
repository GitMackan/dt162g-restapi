const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    term: {
        type: String,
        required: true
    },
    progression: {
        type: String,
        required: true
    },
    coursePlan: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Courses', CourseSchema);