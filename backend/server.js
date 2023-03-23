const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mqtt = require('mqtt');
const db = require('./config/db');
const routes = require('./routes');
const http = require('http');
const port = process.env.PORT || 5000;
const errorHandleMiddlewares = require('./middlewares/errorHandleMiddlewares');
const WebSockets = require("./utils/WebSockets");

// Env variables
require("dotenv").config();

// Connect to DB
db.connect();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.get("/", (req, res) => {
    res.send("Successfully running !");
});

// Route 
routes(app);

app.use(errorHandleMiddlewares.errorHandler);

const server = http.createServer(app);
/** Create socket connection */
global.io = require('socket.io')(server, { cors: { origin: "*" } });

global.io.use(WebSockets.socketAuth);
global.io.on('connection', WebSockets.connection)
    /** Listen on provided port, on all network interfaces. */


ada_user = process.env.ADA_USERNAME;
ada_key = process.env.ADA_KEY;
const client = mqtt.connect({
    host: process.env.ADA_HOST,
    port: 1883,
    username: ada_user,
    password: ada_key,
    clientId: 'mqttjs_' + Math.random().toString(16).substring(2, 8)
});

// test 
// const { AdafruitIO } = require('adafruit-io');
// const aio = new AdafruitIO(ada_user, ada_key);
// feeds = aio.feeds()

// subscribe to the Adafruit feed
client.on('connect', function() {
    // aio.feeds().then(feeds => {
    //     console.log(feeds);
    // });
    let feedList = ["temperature", "light", "fan", "fanbutton", "humi", "fanmode"]
    feedList.forEach(x => {
        client.subscribe(`${ada_user}/feeds/${x}`);
    })
    console.log("Connected to adafruit feed");
});
// client.publish('<username>/feeds/<feed_key>', 'Hello, Adafruit!');
const Device = require('./models/deviceModel');
const Sensor = require('./models/sensorModel');
client.on('message', async function(topic, message) {
    console.log('Received topic:', topic.toString());
    console.log('Received message:', message.toString());
    global.io.in(topic.toString()).emit(topic.toString(), message.toString());
    let feed = topic.toString().substring(`${process.env.ADA_USERNAME}/feeds/`.length)
    await Device.updateMany({ feed }, {
        $push: {
            deviceRecord: {
                state: Number(message),
                time: new Date()
            }
        }
    })
    await Sensor.updateMany({ feed }, {
        $push: {
            sensorRecord: {
                value: Number(message),
                time: new Date()
            }
        }
    })
});

server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
    console.log(`Listening on port:: http://localhost:${port}/`)
});