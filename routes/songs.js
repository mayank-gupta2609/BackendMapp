const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Songs = require('../models/Song');
const Lyrics = require('../models/Lyrics');
const { body, validationResult } = require('express-validator');
const fetchadmin = require('../middleware/fetchadmin');

router.get('/getallsongs', async (req, res) => {
    try {
        const songs = await Songs.find();
        res.json(songs);
        console.log(songs[0].artist);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Kuch nahi mila vro");
    }
})

router.get('/getsonginfo/:id', async (req, res) => {
    try {
        const song = await Songs.findById(req.params.id);
        console.log(song)
        res.json(song);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Kuch nahi mila vro");

    }
});

router.get('/getsonglyrics/:name', async (req, res) => {
    try {
        const song = await Songs.findOne({ name: req.params.name });
        console.log(song)
        const lyric = await Lyrics.findOne({ m_id: song._id });
        // console.log(lyric)
        res.json(lyric);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Kuch nahi mila vro");

    }
});


router.post('/searchsong', async (req, res) => {
    try {
        const songs = await Songs.find({ name: { $regex: new RegExp(req.body.name) } });
        console.log(songs[0].name);
        res.json(songs);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Kuch nahi mila vro");
    }
})

router.post('/addsong', fetchadmin, async (req, res) => {
    try {
        const { name, artist, genre, location, img } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const song = new Songs({
            name, artist, genre, location, img
        })

        const addedsong = await song.save();
        res.json(addedsong);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


router.post('/addsonglyrics' , async (req, res) => {
    try {
        const { name, lyric } = req.body;

        const song = await Songs.findOne({ name: name })
        if (song) {
            console.log(song)
        }

        let id = song._id

        const lyric__ = new Lyrics({
            m_id: id,
            lyricContent: lyric
        })

        const addedsong = await lyric__.save();
        res.json(addedsong);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router