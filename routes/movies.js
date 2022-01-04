const express = require('express')
const router = express.Router();

const Movie = require('../models/Movie');

router.use(express.json());
router.use(express.urlencoded({
    extended: true
}));

// Hämta alla kurser från databasen
router.get('/', async (req, res) => {
    try{
        const movies = await Movie.find();
        res.json(movies);
    }catch(err) {
        res.json({ message: err });
    }
});

// Lägg till kurs till databasen
router.post('/', (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        imdb: req.body.imdb,
        review: req.body.review
    });
    try{
        const savedMovie = movie.save();
        res.json(savedMovie);
    } catch(err) {
        res.json({ message: err });
    }
});

// Hämta en specifik kurs från database
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        res.json(movie);
    } catch (err) {
        res.json({ message: err });
    }
});

// Radera en kurs från databas
router.delete('/:id', async (req, res) => {
    try {
        const deletedMovie = await Movie.deleteOne({_id: req.params.id})
        res.send("Kurs borttagen!");
    } catch (err) {
        res.json({ message: err })
    }
})

// Uppdatera en kurs i databasen
router.patch('/:id', async (req, res) => {
    try {
        const updatedMovie = await Movie.updateOne(
            {_id: req.params.id},
            {$set:
            {
                title: req.body.title,
                director: req.body.director,
                year: req.body.year,
                imdb: req.body.imdb,
                review: req.body.review
            }
        });
        res.json(updatedMovie);
    } catch(err) {
        res.json({ message: err });
    }  
});

module.exports = router;