const mongoose = require('mongoose');
const { Schema } = mongoose;

const SongSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    artist: {
        type: [String],
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true,
    }
    //lyrics in diff model
})

const Song = mongoose.model('song', SongSchema);
module.exports = Song;


