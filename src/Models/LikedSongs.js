const mongoose = require('mongoose');
const { Schema } = mongoose;

const LikedSongSchema = new Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    tracks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'song'
    }
})

const LikedSongs = mongoose.model('likedsong', LikedSongSchema);
module.exports = LikedSongs;