const Room = require('../models/room');

const create = async (payload) => {
    const { topic, selectedType, ownerId } = payload;
    return await Room.create({
        topic,
        selectedType,
        ownerId,
        speakers: [ownerId]
    })
}

module.exports = { create };