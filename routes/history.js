const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Songs = require('../models/Song')
const History = require('../models/History')

router.get('/gethistory/:id', async (req, res) => {
    try {
        let id = req.params.id
        let history = await History.find({ uid: id })
        let ids = history[0].tracks
        let songs = []
        for (let i = 0; i < ids.length; i++) {
            let s = await Songs.findById(ids[i])
            songs.push(s)
        }
        res.json({ songs, history })

    } catch (err) {
        console.log(err)
        res.status(500).send("Kuch nahi mila vro")
    }
})

router.post('/updatehistory/:id', async (req, res) => {
    try {
        let id = req.params.id
        const songExists = await Songs.findOne({ name: req.body.track });
        await History.findOneAndUpdate({ uid: id }, {
            $push: {
                tracks: {
                    $each: [songExists._id],
                    $position: 0
                }
            }
        })
        let h = await History.find({ uid: id })
        res.json(h)
    } catch (err) {
        console.log(err)
        res.status(500).send("Kuch nahi mila vro")
    }
})

router.post('/createhistory/:id', async (req, res) => {
    try {
        let id = req.params.id
        const h = new History({ uid: id, tracks: [] })
        h.save()
        res.json(h)
    } catch (err) {
        console.log(err)
        res.status(500).send("Kuch nahi mila vro")
    }
})

router.post('/deletehistory/:id', async (req, res) => {
    try {
        let i = req.body.i
        await History.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    [`tracks.${i}`]: null,
                }
            })

        await History.updateOne(
            { _id: req.params.id },
            {
                $pull: {
                    tracks: null,
                },
            })
        res.json('done')
    } catch (err) {
        console.log(err)
        res.status(500).send("Kuch nahi mila vro")
    }
})

router.post('/clearhistory/:id', async (req, res) => {
    try {
        let i = req.body.i
        // let h = await History.findById(id)
        await History.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    tracks: []
                }
            })

        res.json('done')
    } catch (err) {
        console.log(err)
        res.status(500).send("Kuch nahi mila vro")
    }
})

module.exports = router