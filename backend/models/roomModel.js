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

roomModel.statics.getDeviceRecord = async function (roomId, period = 'day'){
  try{
      const oneMonthAgo = new Date(Date.now() - (period == "month")?30:1 * 24 * 60 * 60 * 1000); // One month ago in milliseconds
      let devices =  await this.aggregate([
          { $match: { _id: new mongoose.Types.ObjectId(roomId) } },
          {
            $lookup: {
                from: 'devices',
                localField: '_id',
                foreignField: 'room',
                as: 'devices'
            }
          }, 
          { $unwind: '$devices' },
          {
              $unwind: "$devices.deviceRecord"
          },
          {
              $project: {
                deviceId: "$devices._id",
                feed: "$devices.feed",
                state: "$devices.deviceRecord.state",
                time: "$devices.deviceRecord.time"
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
                _id: {deviceId: "$deviceId", feed: "$feed"},
                records: {
                  $push: {
                    time: "$time",
                    state: "$state"
                  }
                },
              }
          },
          {
              $project: {
                feed: "$_id.feed",
                _id: "$_id.deviceId",
                records: "$records",
              }
          },
          // { $sort: { "time": 1 } },


      ])
      for (let i = 0;i<devices.length;i++){
          let totalTime = 0;
          let j = 0;
          for (j = 0;j<devices[i].records.length-1;j++){
              if (devices[i].records[j].state == 1){
                  totalTime += (devices[i].records[j+1].time - devices[i].records[j].time);
              }
          }
          if (devices[i].records[j].state == 1){
              totalTime += (new Date() - devices[i].records[j].time);
          }
          delete devices[i].records  
          devices[i].totalTime = totalTime/(1000*60*60);
      }
      return devices
      
  }
  catch (error) {
      throw (error)
  }
}

module.exports = mongoose.model('Room', roomModel);