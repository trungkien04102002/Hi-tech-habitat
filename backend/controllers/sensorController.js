const Sensor = require('../models/sensorModel');
const Room = require('../models/roomModel');
var mongoose = require('mongoose');


const asyncHandler = require('express-async-handler')


class SensorController {
    //  [ GET - ROUTE: api/sensor/:id ] -- id is the ID of sensor
    getSensor = asyncHandler(async(req, res) => {
        var room = await Room.findOne({
            user: req.user._id
        });
        var sensor = await Sensor.findById(req.params.id);
        if (!sensor) {
            res.status(404)
            throw new Error("Sensor does not exist!")
        } else {
            if (sensor.room.toString() != room._id.toString()) {
                // console.log("ID sensor :", sensor.id);
                // console.log("Room ID  of sensor :", sensor.room);
                // console.log("Room id :", room._id);
                res.status(401)
                throw new Error("This sensor is belong to another room!")
            } else {
                res.json(sensor);
            }
        }
    })

    //  [POST - ROUTE: api/sensor/:id]  -- id is the ID of  the room 
    addSensor = asyncHandler(async(req, res) => {
        var room = await Room.findById(req.params.id)
        if (!room) {
            res.status(404)
            throw new Error('Room does not exist')
        }
        if (room.user != req.user._id) {
            res.status(401)
            throw new Error("You don't have permit to add sensor in this rooms!")
        }
        const { type, unit, feed } = req.body;
        const allowedFeeds = ['humi', 'temperature']
        if (!allowedFeeds.includes(req.body.feed)) {
            return res.status(400).send({ error: 'Feed of sensor must be humi or temperature!' })
        }

        const sensorCheck = await Sensor.findOne({
            type,
            room: room._id
        });
        if (!sensorCheck) {
            var newSensor = await Sensor.create({
                type,
                unit,
                feed,
                sensorRecord: [],
                room: room._id
            })
            if (newSensor) {
                await newSensor.save();
                res.json(newSensor);
                // console.log(newSensor._id)
            } else {
                res.status(404);
                throw new Error("Fail to add new sensor!");
            }
        } else {
            res.status(404);
            throw new Error('Only one type of sensor for each room!');
        }
    })

    // [ PATCH - ROUTE: api/sensor/:id ]  -- id is the ID of  the sensor
    updateSensor = asyncHandler(async(req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['type', 'unit', 'feed']
            // const allowedFeedsUpdates = ['fan', 'light', 'humi']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // Check operation

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
        // console.log(req.body.feed)

        // if (!allowedFeedsUpdates.includes(req.body.feed)) {
        //     return res.status(400).send({ error: 'Invalid updates!' })
        // }

        var sensor = await Sensor.findById(req.params.id);
        if (!sensor) {
            res.status(404)
            throw new Error("Sensor does not exist!")
        } else {
            var room = await Room.findOne({
                    _id: sensor.room
                })
                // console.log(room)

            if (!room) {
                res.status(404)
                throw new Error('Room does not exist')
            }
            if (room.user.toString() != req.user._id) {
                res.status(401)
                throw new Error("You don't have permit to update this sensors!")
            }
            // console.log(room.user.toString())
            // console.log(req.user._id)
            if (sensor.room.toString() != room._id.toString()) {
                res.status(401)
                throw new Error("This sensor is belong to another room!")
            } else {

                var newSensor = await Sensor.findOneAndUpdate({ _id: req.params.id }, {
                    type: (req.body.type || sensor.type),
                    unit: (req.body.unit || room.unit),
                    feed: (req.body.feed || room.feed)
                }, {
                    new: true
                });
                res.json(newSensor)
            }
        }
    })

    //  [DELETE - ROUTE: api/sensor/:id] 
    deleteSensor = asyncHandler(async(req, res) => {
        var sensor = await Sensor.findById({
            _id: req.params.id
        })
        if (!sensor) {
            res.status(404)
            throw new Error("Sensor does not exist!")
        } else {
            var room = await Room.findOne({ _id: sensor.room })
            if (room.user.toString() == req.user._id) {
                await sensor.deleteOne({ _id: req.params.id });
                res.json({ sensor, message: "Sensor is deleted!" });
            } else {
                res.status(401)
                throw new Error("You don't have permit to delete this sensors!")
            }
        }
    })

}

module.exports = new SensorController;