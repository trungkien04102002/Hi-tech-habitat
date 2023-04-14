const Device = require('../models/deviceModel');
const Room = require('../models/roomModel');
var mongoose = require('mongoose');
const https = require('https');


const asyncHandler = require('express-async-handler')


class DeviceController {
    //  [ GET - ROUTE: api/device/:id ] -- id is the ID of device
    getDevice = asyncHandler(async(req, res) => {
        var room = await Room.findOne({
            user: req.user._id
        })
        var device = await Device.findById(req.params.id);
        if (!device) {
            res.status(404)
            throw new Error("Device does not exist!")
        } else {
            if (device.room.toString() != room._id.toString()) {
                // console.log("ID device :", device.id);
                // console.log("Room ID  of Device :", device.room);
                // console.log("Room id :", room._id);
                res.status(401)
                throw new Error("This device is belong to another room!")
            } else {
                res.json(device);
            }
        }
    })

    //  [POST - ROUTE: api/device/:id]  -- id is the ID of  the room 
    addDevice = asyncHandler(async(req, res) => {
        var room = await Room.findById(req.params.id)
        if (!room) {
            res.status(404)
            throw new Error('Room does not exist')
        }
        if (room.user != req.user._id) {
            res.status(401)
            throw new Error("You don't have permit to add device in this rooms!")
        }
        const { name, type, feed } = req.body;
        const allowedFeeds = ['fan', 'light', 'fanbutton', 'fanmode']
        if (!allowedFeeds.includes(req.body.feed)) {
            return res.status(400).send({ error: 'Invalid input!' })
        }

        const deviceCheck = await Device.findOne({
            name,
            room: room._id
        });
        if (!deviceCheck) {
            var newDevice = await Device.create({
                name,
                type,
                feed,
                deviceRecord: [],
                room: room._id
            })
            if (newDevice) {
                await newDevice.save();
                res.json(newDevice);
                // console.log(newDevice._id)
            } else {
                res.status(404);
                throw new Error("Fail to add new device!");
            }
        } else {
            res.status(404);
            throw new Error('Please enter another name!');
        }
    })

    // [ PATCH - ROUTE: api/device/:id ]  -- id is the ID of  the device
    updateDevice = asyncHandler(async(req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'type', 'feed']
        const allowedFeedsUpdates = ['fan', 'light', 'fanbutton']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // Check operation

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
        console.log(req.body.feed)

        if (!allowedFeedsUpdates.includes(req.body.feed)) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        var device = await Device.findById(req.params.id);
        if (!device) {
            res.status(404)
            throw new Error("Device does not exist!")
        } else {
            var room = await Room.findOne({
                    _id: device.room
                })
                // console.log(room)

            if (!room) {
                res.status(404)
                throw new Error('Room does not exist')
            }
            if (room.user.toString() != req.user._id) {
                res.status(401)
                throw new Error("You don't have permit to update this devices!")
            }
            // console.log(room.user.toString())
            // console.log(req.user._id)
            if (device.room.toString() != room._id.toString()) {
                res.status(401)
                throw new Error("This device is belong to another room!")
            } else {

                var newDevice = await Device.findOneAndUpdate({ _id: req.params.id }, {
                    name: (req.body.name || device.name),
                    type: (req.body.type || room.type),
                    feed: (req.body.feed || room.feed)
                }, {
                    new: true
                });
                res.json(newDevice)
            }
        }
    })

    //  [DELETE - ROUTE: api/room/:id] 
    deleteDevice = asyncHandler(async(req, res) => {
        var device = await Device.findById({
            _id: req.params.id
        })
        if (!device) {
            res.status(404)
            throw new Error("Device does not exist!")
        } else {
            var room = await Room.findOne({ _id: device.room })
            if (room.user.toString() == req.user._id) {
                await Device.deleteOne({ _id: req.params.id });
                res.json({ device, message: "Device is deleted!" });
            } else {
                res.status(401)
                throw new Error("You don't have permit to delete this devices!")
            }
        }
    })


    // [ POST - ROUTE: api/device/state/:id ] 
    addStateDevice = asyncHandler(async(req, res) => {
        const { on } = req.body;


        var device = await Device.findById(req.params.id);
        if (!device) {
            res.status(404)
            throw new Error("Device does not exist!")
        } 

        var room = await Room.findOne({_id: device.room})

        if (room.user.toString() != req.user._id) {
            res.status(401)
            throw new Error("You don't have permit to update this devices!")
        }
        const aioKey = process.env.ADA_KEY;
        const aioUsername = process.env.ADA_USERNAME;
        const feedKey = device.feed;
      

        const postData = JSON.stringify({ value: Number(on)==1 ? 1 : 0 });
          
        const options = {
            hostname: 'io.adafruit.com',
            port: 443,
            path: `/api/v2/${aioUsername}/feeds/${feedKey}/data`,
            method: 'POST',
            headers: {
                'X-AIO-Key': aioKey,
                'Content-Type': 'application/json',
                'Content-Length': postData.length
            }
        };

        const request = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`);
          
        });
        request.on('error', error => {
            console.error(error);
            res.status(300)
            throw new Error("Cannot make request to adafruit")
        });
        request.write(postData);
        request.end();
        res.status(200).json({msg:`Light turned ${Number(on) == 1 ? 'on' : 'off'}`});

        // await Device.updateMany({ feed:feedKey }, {
        //     $push: {
        //         deviceRecord: {
        //             state: Number(on),
        //             time: new Date()
        //         }
        //     }
        // })

        
    })
}


module.exports = new DeviceController;