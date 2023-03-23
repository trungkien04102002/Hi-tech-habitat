var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomModel = new Schema({
    name: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

roomModel.virtual('devices', {
    ref: 'Device',
    localField: '_id',
    foreignField: 'device'
})

roomModel.virtual('sensors', {
    ref: 'Sensor',
    localField: '_id',
    foreignField: 'sensor'
})


module.exports = mongoose.model('Room', roomModel);