var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Sensor = new Schema({
    typeOfSensor: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    sensorRecord: [{
        value: {
            type: Number,
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

module.exports = mongoose.model('Sensor', sensorModel);