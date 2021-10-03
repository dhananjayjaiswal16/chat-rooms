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

const getAllRooms = async (types) => {

    const rooms = await Room.find({ selectedType: { $in: types } })
        .populate('speakers')
        .populate('ownerId')
        .exec()
    return rooms;
}

module.exports = { create, getAllRooms };