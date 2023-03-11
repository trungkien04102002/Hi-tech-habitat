var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Device = new Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        required: true
    },
    deviceRecord: [{
        state: {
            type: Boolean,
            required: true
        },
        time: {
            type: Date,
            required: true
        }
    }],
    room: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Room'
    }
});

module.exports = mongoose.model('Device', deviceModel);