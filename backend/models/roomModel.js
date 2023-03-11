var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room = new Schema({
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

module.exports = mongoose.model('Room', roomModel);