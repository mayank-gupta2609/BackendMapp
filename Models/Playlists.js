const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true,
        // unique: true
    },
    tracks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'song' 
    }
})

const Playlist = mongoose.model('playlist', PlaylistSchema);
module.exports = Playlist;