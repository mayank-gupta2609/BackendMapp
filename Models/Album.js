const mongoose = require('mongoose');
const { Schema } = mongoose;

const albumSchema = new Schema({
    name: {
        type: 'string',
        required: true
    },
    tracks: {
        type: [Object],
        required: true,
    },
    img: {
        type: 'string',
    },
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'artist'
    }
})

const Album = mongoose.model('album', albumSchema);
module.exports = Album;