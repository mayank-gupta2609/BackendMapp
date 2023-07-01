const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Songs = require('../models/Song');
const Albums = require('../models/Album');

router.get('/getalbums/:id', async (req, res) => {

    try {
        let aid = req.params.id;
        let album__ = await Albums.findById(aid)
        let songs = []
        // console.log(album__.tracks)
        let ids = album__.tracks
        for (let i = 0; i < ids.length; i++) {
            let s = await Songs.findById(ids[i])
            songs.push(s)
        }
        // console.log(songs)
        res.json({ album__, songs })

    } catch (err) {
        console.log(err)
        res.status(500).send("Kuch nahi mila vro")
    }
})

router.post('/addalbum', async (req, res) => {

    try {
        let aid = req.body.aid;
        let name = req.body.name;
        let tracks = req.body.tracks;
        let img = req.body.img;
        const addedalbum = new Albums({
            name, tracks, aid, img
        })

        const album__ = await addedalbum.save()
        res.json(album__)

    } catch (err) {

    }

})



module.exports = router