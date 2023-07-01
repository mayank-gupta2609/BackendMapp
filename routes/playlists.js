const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')
const Playlists = require('../models/Playlists');
const Songs = require('../models/Song');

router.get('/getallplaylists/:id', fetchuser, async (req, res) => {
    try {
        const playlists = await Playlists.find({ user: req.params.id });
        console.log(playlists)
        res.json(playlists);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Kuch nahi mila vro");
    }
})

// const getSongs = async (args) => {
//     console.log(args)
// }


router.get('/getplaylist/:id', fetchuser, async (req, res) => {
    try {
        const playlist = await Playlists.find({ _id: req.params.id });
        let ids = playlist[0].tracks
        let songs = []

        for (let i = 0; i < ids.length; i++) {
            let s = await Songs.findById(ids[i])
            // console.log(s)
            songs.push(s)
        }
        res.json({ playlist, songs });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Kuch nahi mila vro");
    }
})


router.post('/addplaylist', fetchuser, [
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('tracks', 'Enter a valid track name')], async (req, res) => {
        try {
            const { name, tracks } = req.body;
            if (!tracks) {
                const playlist = new Playlists({
                    name, user: req.user.id, tracks: []
                })
                const addedplaylist = await playlist.save();
                res.json(addedplaylist);
                return;
            }
            let __tracks = [];

            for (let i = 0; i < tracks.length; i++) {
                let id = await Songs.find({ name: tracks[i] })
                console.log(id)
                __tracks.push(id[0]._id)
            }

            console.log(__tracks)
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const playlist = new Playlists({
                name, user: req.user.id, tracks: __tracks
            })

            const addedplaylist = await playlist.save();
            res.json(addedplaylist);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

router.put('/addtoplaylist', fetchuser, async (req, res) => {
    try {
        const songExists = await Songs.findById(req.body.track)
        console.log(req.body.track)
        console.log(songExists)
        if (songExists) {

            // const playlistToBeUpdated = await Playlists.find({_id: req.params.id}); 

            console.log(songExists._id);
            // Playlists.findByIdAndUpdate(req.params.id,{
            //     $push : {tracks: songExists.name}
            // })

            // await Playlists.findOneAndUpdate

            await Playlists.findByIdAndUpdate(req.body.id, {
                $addToSet: { tracks: songExists._id }
            })

            // res.json(playlistToBeUpdated);
            res.json('hi')

        } else {
            res.send('No such song exists');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/deleteplaylist/:id', fetchuser, async (req, res) => {
    try {
        await Playlists.findByIdAndDelete({ _id: req.params.id })
        res.send('done')
    } catch (error) {
        res.status(500).send("jo hai hi nahi use kese udayega?")
        console.log(error)
    }
})

router.delete('/deletefromplaylist/:id', fetchuser, async (req, res) => {
    try {
        let song = await Songs.find({ name: req.body.name })
        console.log(song)
        await Playlists.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    tracks: song[0]._id,
                },
            });

        res.send('op')
    } catch (error) {
        res.status(500).send("jo hai hi nahi use kese udayega?")
        console.log(error)
    }
})

module.exports = router