const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    imdb: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Movies', MovieSchema);