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

roomModel.statics.getRecords = async function (roomId, period = 'day'){
    try{
        const oneMonthAgo = new Date(Date.now() - (period == "month")?30:1 * 24 * 60 * 60 * 1000); // One month ago in milliseconds
        return await this.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(roomId) } },
            {
            $lookup: {
                from: 'sensors',
                localField: '_id',
                foreignField: 'room',
                as: 'sensors'
            }
            }, 
            { $unwind: '$sensors' },
            {
                $unwind: "$sensors.sensorRecord"
            },
            {
                $project: {
                  sensorId: "$sensors._id",
                  feed: "$sensors.feed",
                  recordId: "$sensors.sensorRecord._id",
                  value: "$sensors.sensorRecord.value",
                  time: "$sensors.sensorRecord.time"
                }
            },
            {
                $match: {
                  time: {
                    $gte: oneMonthAgo
                  }
                }
            },
            {
                $group: {
                  _id: {sensorId: "$sensorId", feed: "$feed"},
                  records: {
                    $addToSet: {
                      time: "$time",
                      value: "$value"
                    }
                  },
                  meanValue: {
                    $avg: "$value"
                  },
                  maxValue: {
                    $max: "$value"
                  },
                  minValue: {
                    $min: "$value"
                  }
                }
            },
            {
                $project: {
                  feed: "$_id.feed",
                  _id: "$_id.sensorId",
                  records: "$records",
                  meanValue: "$meanValue",
                  maxValue: "$maxValue",
                  minValue: "$minValue"
                }
            },
            // apply pagination
            // { $skip: options.page * options.limit },
            // { $limit: options.limit },
        ]) 
    }
    catch (error) {
        throw (error)
    }
}

module.exports = mongoose.model('Room', roomModel);