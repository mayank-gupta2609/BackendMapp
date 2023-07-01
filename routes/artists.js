const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Songs = require('../models/Song');
const Artists = require('../models/Artist');
const fetchadmin = require('../middleware/fetchadmin');
const { body, validationResult } = require('express-validator')

router.get('/getartistinfo/:name', async (req, res) => {
    try {
        let artist = await Artists.find({ name: req.params.name });
        console.log(artist)
        res.json(artist);
    } catch (err) {
        console.log(err)
        res.status(500).send("Kuch nahi mila vro");
    }
})

// router.get('/getartistinfo/:name', async (req, res) => {
//     try {
//         let artist = await Artists.find(req.params.name);
//         console.log(artist)
//         res.json(artist);
//     } catch (err) {
//         console.log(err)
//         res.status(500).send("Kuch nahi mila vro");
//     }
// })

router.get('/getartists/', async (req, res) => {
    try {
        let artist = await Artists.find();
        console.log(artist)
        res.json(artist);
    } catch (err) {
        console.log(err)
        res.status(500).send("Kuch nahi mila vro");
    }
})

router.get('/getallsongs/:id', fetchuser, async (req, res) => {
    try {
        let a = await Artists.findById(req.params.id);
        let songs = a.songs;
        res.json(songs);
    } catch (err) {
        console.log(err)
        res.status(500).send("Kuch nahi mila vro")
    }
})

router.get('/getallalbums/:id', fetchuser, async (req, res) => {
    try {
        let a = await Artist.findById(req.params.id);
        let albums = a.albums;
        res.json(albums);
    } catch (err) {
        console.log(err)
        res.status(500).send("Kuch nahi mila vro")
    }
})

router.post('/addalbum', async (req, res) => {

    try {
        let id = req.body.aid;
        await Artists.findByIdAndUpdate(id, {
            $addToSet: {
                albums: req.body.album
            }
        })

        res.send("hii")
    } catch (err) {
        console.log(err)
    }
})

router.post('/addsong', async (req, res) => {

    try {
        let id = req.body.aid;
        await Artists.findByIdAndUpdate(id, {
            $addToSet: {
                songs: req.body.songs
            }
        })
        res.send("hii")
    } catch (err) {
        console.log(err)
    }
})

router.post('/addartist', async (req, res) => {

    try {
        let a = req.body.artist;
        let _avatar = req.body.avatar;
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        const artist = new Artists({
            name: a, albums: req.body.albums, songs: req.body.songs, avatar: _avatar
        })

        const newartist = await artist.save()
        console.log(newartist)
        res.json(newartist)
    } catch (err) {
        console.log(err)
    }
})




module.exports = router