// const ChatMessage = require('../models/chatMessageModel');
const User = require('../models/userModel');
const Room = require('../models/roomModel');
const Device = require('../models/deviceModel');
const Sensor = require('../models/sensorModel');

// const ChatRoom = require('../models/chatRoomModel');
const jwt = require('jsonwebtoken');
class WebSockets {
  users = [];
  connection(client) {
    const devices = client.handshake.auth.devices;
    const sensors = client.handshake.auth.sensors;
    const {_id} = client.handshake.auth.user;
    devices.forEach(element => {
        client.join(`${process.env.ADA_USERNAME}/feeds/`+ element.stateFeed.toLowerCase());
    });
    devices.forEach(element => {
      client.join(`${process.env.ADA_USERNAME}/feeds/`+ element.modeFeed.toLowerCase());
    });
    sensors.forEach(element => {
        client.join(`${process.env.ADA_USERNAME}/feeds/`+ element.feed.toLowerCase());
    });
    // event fired when the chat room is disconnected
    client.on("disconnect", (reason) => {
        // this.users = this.users.filter((user) => user.socketId !== client.id);
    });
    io.on("error", (error) => {
      console.log(`error: `,error);
        // this.users = this.users.filter((user) => user.socketId !== client.id);
    });
    // client.on("postMessage", async ({message}) => {
    //     const result = await ChatMessage.postMessageToChatRoom(title,message,_id);
    //     // console.log(`message ${client.id}`);
    //     // console.log(client.rooms);

    //     io.in(title).emit("receiveMessage", result);
    // });
    // add identity of user mapped to the socket id
    // client.on("identity", (userId) => {
    //   this.users.push({
    //     socketId: client.id,
    //     userId: userId,
    //   });
    // });

  }


  async socketAuth(client,next){
    try {
      const token =  client.handshake.headers.token;
      const roomID =  client.handshake.headers.roomid;
      if (!token) {
        throw new Error('Not authorized, token failed') ;              
      }
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      let room = await Room.findById(roomID).lean()
      if (!room || room.user != decodedToken._id) {
          throw new Error('You are not allowed to access this room') ;              
      }
      client.handshake.auth.user=decodedToken;
      client.handshake.auth.devices = await Device.find({room:roomID}).lean();
      client.handshake.auth.sensors = await Sensor.find({room:roomID}).lean();

      next()

    }
    catch {
        client.disconnect()
        console.log('Not authorized, token failed') ;              
    }
  }

  // subscribeOtherUser(room, otherUserId) {
  //   const userSockets = this.users.filter(
  //     (user) => user.userId === otherUserId
  //   );
  //   userSockets.map((userInfo) => {
  //     const socketConn = global.io.sockets.connected(userInfo.socketId);
  //     if (socketConn) {
  //       socketConn.join(room);
  //     }
  //   });
  // }
}

module.exports = new WebSockets();
