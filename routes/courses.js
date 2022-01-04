const express = require('express')
const router = express.Router();
const Course = require('../models/Course');

router.use(express.json());
router.use(express.urlencoded({
    extended: true
}));

// Hämta alla kurser från databasen
router.get('/', async (req, res) => {
    res.send('Hej');
    try{
        const courses = await Course.find();
        res.json(courses);
    }catch(err) {
        res.json({ message: err });
    }
});

// Lägg till kurs till databasen
router.post('/', (req, res) => {
    const course = new Course({
        courseName: req.body.courseName,
        courseCode: req.body.courseCode,
        term: req.body.term,
        progression: req.body.progression,
        coursePlan: req.body.coursePlan
    });
    try{
        const savedCourse = course.save();
        res.json(savedCourse);
    } catch(err) {
        res.json({ message: err });
    }
});

// Hämta en specifik kurs från database
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        res.json(course);
    } catch (err) {
        res.json({ message: err });
    }
});

// Radera en kurs från databas
router.delete('/:id', async (req, res) => {
    try {
        const deletedCourse = await Course.deleteOne({_id: req.params.id})
        res.send("Kurs borttagen!");
    } catch (err) {
        res.json({ message: err })
    }
})

// Uppdatera en kurs i databasen
router.patch('/:id', async (req, res) => {
    try {
        const updatedCourse = await Course.updateOne(
            {_id: req.params.id},
            {$set:
            {
                courseName: req.body.courseName,
                courseCode: req.body.courseCode,
                term: req.body.term,
                progression: req.body.progression,
                coursePlan: req.body.coursePlan
            }
        });
        res.json(updatedCourse);
    } catch(err) {
        res.json({ message: err });
    }  
});

module.exports = router;