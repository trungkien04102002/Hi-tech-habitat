var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deviceModel = new Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    feed: {
        type: String,
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
},
{
    timestamps: {
        createdAt: true, 
        updatedAt: false
    }
});

module.exports = mongoose.model('Device', deviceModel);