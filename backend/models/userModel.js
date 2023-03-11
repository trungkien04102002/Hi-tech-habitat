var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

var userModel = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: {
        createdAt: true, 
        updatedAt: false
    }
});
userModel.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
  
module.exports = mongoose.model('User', userModel);