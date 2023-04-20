const Room = require('../models/roomModel');
const Sensor = require('../models/sensorModel');
const Device = require('../models/deviceModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const asyncHandler = require('express-async-handler')


class RoomController {


    //  [ GET - ROUTE: api/room ]
    getRoomsOfUser = asyncHandler(async(req, res) => {
        var rooms = await Room.find({ user: req.user._id });
        res.json(rooms)
    })

    //  [GET - ROUTE: api/room/:id]  
    getOneRoom = asyncHandler(async(req, res) => {
        console.log('co vo day k')
        var room = await Room.findById(req.params.id);
        if (!room) {
            res.status(404)
            throw new Error("Room does not exist!")
        } else {
            if (room.user == req.user._id) {
                var roomSensors = await Sensor.find({ room: new mongoose.Types.ObjectId(room.id) }, 'type sensorRecord')
                var roomDevices = await Device.find({ room: new mongoose.Types.ObjectId(room.id) }, 'name deviceRecord')

                var numOfDevices = Object.keys(roomDevices).length
                for (var i = 0; i < numOfDevices; i++) {
                    var x = roomDevices[i].deviceRecord
                    if (x.length >= 1) {
                        var result = x.reduce((a, b) => a.time > b.time ? a : b);
                        roomDevices[i].deviceRecord = result
                    }
                }

                var numOfSensors = Object.keys(roomSensors).length
                for (var i = 0; i < numOfSensors; i++) {
                    var x = roomSensors[i].sensorRecord
                    if (x.length >= 1) {
                        var result = x.reduce((a, b) => a.time > b.time ? a : b);
                        roomSensors[i].sensorRecord = result
                    }
                }

                res.json({
                    room,
                    roomSensors,
                    roomDevices
                });
            } else {
                res.status(401)
                throw new Error("You don't have permit to view details this room!")
            }
        }
    })

    //  [PATCH - ROUTE: api/room/:id]  
    updateOneRoom = asyncHandler(async(req, res) => {
        var room = await Room.findById(req.params.id);
        if (room) {
            if (room.user == req.user._id) {
                var newRoom = await Room.findOneAndUpdate({ _id: req.params.id }, {
                    name: (req.body.name || room.name),
                    roomType: (req.body.roomType || room.roomType)
                }, {
                    new: true
                });
                res.json(newRoom)
            } else {
                res.status(401)
                throw new Error("You don't have permit to update this room!")
            }
        } else {
            res.status(404)
            throw new Error('Room does not exist')
        }
    })

    //  [DELETE - ROUTE: api/room/:id]  
    deleteOneRoom = asyncHandler(async(req, res) => {
        var room = await Room.findById({
            _id: req.params.id
        });
        if (room) {
            if (room.user == req.user._id) {
                await Room.deleteOne({ _id: req.params.id });
                await Device.deleteMany({ room: req.params.id });
                await Sensor.deleteMany({ room: req.params.id });
                res.json({ room, message: "Room is deleted!" });
            } else {
                res.status(401)
                throw new Error("You don't have permit to delete this room!")
            }
        } else {
            res.status(404);
            throw new Error('Room does not exist!');
        }
    })

    //  [POST - ROUTE: api/room]  
    addRoom = asyncHandler(async(req, res) => {
        const user = req.user._id;
        const { name, roomType } = req.body;
        const roomCheck = await Room.findOne({
            name,
            user
        });
        if (!roomCheck) {
            var newRoom = await Room.create({
                name,
                roomType,
                user
            })
            if (newRoom) {
                await newRoom.save();
                res.json(newRoom);
            } else {
                res.status(404);
                throw new Error("Invalid data");
            }
        } else {
            res.status(404);
            throw new Error('Please enter another name!');
        }

    })
}

module.exports = new RoomController;