const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
const cookieparser = require("cookie-parser");
connectToMongo()
const port = 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieparser())
app.use(cors({ origin: true, credentials: true }))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/playlists', require('./routes/playlists'))
app.use('/api/songs', require('./routes/songs'))
app.use('/api/artists', require('./routes/artists'))
app.use('/api/albums', require('./routes/album'))
app.use('/api/history', require('./routes/history'))
app.use('/api/likedsongs', require('./routes/likedsongs'))

app.get('/', (req, res) => {

    // res.cookie("statement", "1234")
    res.send('hi')
})

// var x = 0

// app.get('/incx', (req, res) => {
//     x = x + 1
//     res.json(x)
// })


app.listen(port, () => {
    console.log(`backend listening at http://localhost:${port}`)
})


// 