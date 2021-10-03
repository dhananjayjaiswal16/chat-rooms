const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const roomService = require('../services/roomService');



//route         GET api/send-otp
//description   Get all rooms 
//access        Public
router.get('/', auth, async (req, res) => {
    try {
        const rooms = await roomService.getAllRooms(['open']);
        console.log("rooms in get /rooms", rooms);
        return res.json(rooms);
    } catch (err) {
        res.status(500).json({ msg: 'Error while fetching room data' })
    }
});


//route         POST api/rooms
//description   Send rooms
//access        Public
router.post('/', auth, async (req, res) => {
    const { topic, selectedType } = req.body;

    if (!topic || !selectedType) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    const room = await roomService.create({ topic, selectedType, ownerId: req.user.id });

    res.json(room);
})




module.exports = router;