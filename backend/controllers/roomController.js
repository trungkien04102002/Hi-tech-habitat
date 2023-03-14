const Room = require('../models/roomModel');


const asyncHandler = require('express-async-handler')


class RoomController {


    //  [ GET - ROUTE: api/room ]
    getRoomsOfUser = asyncHandler(async(req, res) => {
        var rooms = await Room.find({ user: req.user._id });
        res.json(rooms)
    })

    //  [GET - ROUTE: api/room/:id]  
    getOneRoom = asyncHandler(async(req, res) => {
        var room = await Room.findById(req.param.id);
        if (!room) {
            res.status(404)
            throw new Error("Room does not exist!")
        } else {
            res.json(room)
        }
    })

    //  [PATCH - ROUTE: api/room/:id]  
    updateOneRoom = asyncHandler(async(req, res) => {
        var room = await Room.findById(req.params.id);
        if (room) {
            if (room.user == req.user._id) {
                var newRoom = await Room.findOneAndUpdate({ _id: req.params.id }, {
                    name: (req.body.name || room.roomType),
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