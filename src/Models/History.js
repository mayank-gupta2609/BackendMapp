const mongoose = require('mongoose');
const { Schema } = mongoose;

const HistorySchema = new Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    tracks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'song'
    }
})

const History = mongoose.model('history', HistorySchema);
module.exports = History;