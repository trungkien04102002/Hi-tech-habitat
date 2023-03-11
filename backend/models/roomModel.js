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

module.exports = mongoose.model('Room', roomModel);