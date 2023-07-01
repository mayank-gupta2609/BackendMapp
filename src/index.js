const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
const cookieparser = require("cookie-parser");
const functions = require("firebase-functionsi")
connectToMongo()
const port = 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieparser())
app.use(cors({ origin: true, credentials: true }))
app.use('/api/auth', require('./src/routes/auth'))
app.use('/api/playlists', require('./src/routes/playlists'))
app.use('/api/songs', require('./src/routes/songs'))
app.use('/api/artists', require('./src/routes/artists'))
app.use('/api/albums', require('./src/routes/album'))
app.use('/api/history', require('./src/routes/history'))
app.use('/api/likedsongs', require('./src/routes/likedsongs'))

app.get('/', (req, res) => {
    res.send('hi')
})
 

app.listen(port, () => {
    console.log(`backend listening at http://localhost:${port}`)
})

exports.api = functions.https.onRequest(app)
