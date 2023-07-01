const mongoose = require('mongoose');
const { Schema } = mongoose;

const LyricSchema = new Schema({
    m_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'song',
        required: true
    },
    lyricContent: {
        type: [[String]],
        required: false
    }
});

const Lyric = mongoose.model('lyric', LyricSchema)
module.exports = Lyric