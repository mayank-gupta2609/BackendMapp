const express = require('express');
const User = require('../models/user');
const Admin = require('../models/admin');
const Playlists = require('../models/Playlists');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const LikedSongs = require('../models/LikedSongs');
const History = require('../models/History');

const JWT_SECRET = 'qcVR1cq#@cadAC#$@QVcawdcRE';
const JWT_SECRET_ADMIN = '';

router.post('/adduser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter valid password').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ error: "User exists" })
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email
    });

    const data = {
      user: {
        id: user.id
      }
    }

    h = await LikedSongs.create({ uid: user.id, tracks: [] });
    l = await History.create({ uid: user.id, tracks: [] })
    // console.log(h)
    // console.log(l)

    const authtoken = jwt.sign(data, JWT_SECRET );
    console.log(user)
    const response = {
      authtoken: authtoken
    }
    res.json( response)

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");

  }
})

router.post('/addadmin', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter valid password').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let admin = await User.findOne({ email: req.body.email });

    if (admin) {
      return res.status(400).json({ error: "Admin exists" })
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    admin = await Admin.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email
    });

    const data = {
      admin: {
        id: admin.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET_ADMIN);

    res.json({ authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");

  }
})

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Ye user kaha milega" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Ye user kaha milega" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    console.log(user);
    success = true;  

    try {
      // let playlist___ = await Playlists.find({ user: uid })

      res.json({ success, authtoken })
    } catch (e) {
      // console.log(e)
      res.json({ success, authtoken})
    }

    console.log("success");

  } catch (error) {
    // console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});


router.post('/getuser', fetchuser, async (req, res) => {

  try {
    let userId = req.user.id;
    console.log("userId")
    const user = await User.findById(userId)
    console.log(user)
    const data = {
      user: {
        id: user._id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ uid: user._id, uname: user.name, success: true, authtoken})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

router.post('/adminlogin', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (!admin) {
      success = false
      return res.status(400).json({ error: "Ye user kaha milega" });
    }

    const passwordCompare = await bcrypt.compare(password, admin.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Ye user kaha milega" });
    }
 
    const data = {
      admin: {
        id: admin.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET_ADMIN);
    success = true;
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});


module.exports = router