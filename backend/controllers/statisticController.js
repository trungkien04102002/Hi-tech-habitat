const User = require('../models/roomModel');
const Sensor = require('../models/sensorModel');
const Room = require('../models/roomModel');
const Device = require('../models/deviceModel');

const asyncHandler = require('express-async-handler')


class StatisticController {
    //  [ GET - ROUTE: api/statistic/:id ] -- id is the ID of room
    getStatisticInRoom = asyncHandler(async(req, res) => {
        var room = await Room.findById(req.params.id);
        if (!room) {
            res.status(404)
            throw new Error('Room does not exist')
        }
        else if (room.user != req.user._id){
            res.status(400)
            throw new Error('Not allowed')
        }
        res.json(await Room.getRecords(req.params.id, req.body.period=="day"?"day":"month"))
    })

}

module.exports = new StatisticController;