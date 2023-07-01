const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    albums: {
        type: [Object],
        ref: 'album',
        required: true
    },
    songs: {
        type: [Object],
        ref: 'song',
        required: true
    },
    avatar: {
        type: 'String',
        required: false
    }
})

const Artist = mongoose.model('artist', ArtistSchema)
module.exports = Artist