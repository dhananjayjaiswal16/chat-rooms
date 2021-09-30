const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    selectedType: {
        type: String,
        required: true
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    speakers: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    }
}, {
    timestamps: true
}
)

module.exports = mongoose.model('Room', roomSchema, 'rooms');