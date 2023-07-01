const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Songs = require('../models/Song')
const LikedSongs = require('../models/LikedSongs')

router.get('/getlikedsongs/:id', async (req, res) => {
    try {
        let id = req.params.id
        let ls = await LikedSongs.findOne({ uid: id })
        let ids = ls.tracks
        let songs = []
        for (let i = 0; i < ids.length; i++) {
            let s = await Songs.findById(ids[i])
            songs.push(s)
        }

        res.json({ songs, ids })
    } catch (err) {
        res.status(500).send("Nothing found")
    }
})


router.post('/checklike/:id', async(req, res)=>{
    try{
        let aid = req.params.id
        let uid = req.body.uid
        let ls = await LikedSongs.findOne({ uid: uid })
        if(ls.tracks.includes(aid)){
            res.json(true)
        }   else {
            res.json(false)
        }
        console.log(ls)
 
    } catch(err){
        console.log(err)
        res.status(500).send("Something went wrong")
    }
})

router.post('/addtolikedsongs/:id', async (req, res) => {
    try {
        let uid = req.params.id
        console.log(req.body._id)
        let song = await Songs.findById(req.body._id)
        // console.log(song)
        await LikedSongs.findOneAndUpdate({
            uid: uid
        }, {
            $addToSet: {
                tracks: song._id
            }
        })
        // let ls_ = await LikedSongs.findOne({ uid: uid })
        let ls = await LikedSongs.findOne({ uid: req.body.userid })
        let ids = ls.tracks
        let songs = []
        for (let i = 0; i < ids.length; i++) {
            let s = await Songs.findById(ids[i])
            songs.push(s)
        }
        res.json({"success":"true"})
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.delete('/deletefromlikedsongs/:id', async (req, res) => {
    try {
        let uid = req.params.id
        let song = await Songs.findById(req.body._id)

        await LikedSongs.findOneAndUpdate({
            uid: uid
        }, {
            $pull: {
                tracks: song._id
            }
        })
        
        res.json({"success":"true"})
    } catch (err) {
        res.status(500).send("Nothing found")
    }
})

router.post('/createlikedsongs/:id', async (req, res) => {
    try {
        let id = req.params.id
        const h = new LikedSongs({ uid: id, tracks: [] })
        h.save()
        res.json(h)
    } catch (err) {
        console.log(err)
        res.status(500).send("Kuch nahi mila vro")
    }
})

module.exports = router