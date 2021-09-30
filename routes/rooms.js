const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const roomService = require('../services/roomService');

router.post('/', auth, async (req, res) => {
    const { topic, selectedType } = req.body;

    if (!topic || !selectedType) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    const room = await roomService.create({ topic, selectedType, ownerId: req.user.id });

    res.json(room);
})

module.exports = router;