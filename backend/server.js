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
const WebSockets = require("./utils/WebSockets")

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
global.io = require('socket.io')(server, {cors: {origin: "*"}});

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
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8)
});

// subscribe to the Adafruit feed
client.on('connect', function() {
    let feedList = ["bbc-temp","bbc-led"]
    feedList.forEach(x=>{
        client.subscribe(`${ada_user}/feeds/${x}`);
    })
    console.log("Connected to adafruit feed");
});
// client.publish('<username>/feeds/<feed_key>', 'Hello, Adafruit!');

client.on('message', function(topic, message) {
    console.log('Received topic:', topic.toString());
    console.log('Received message:', message.toString());
    global.io.in(topic.toString()).emit(topic.toString(), message.toString());

});

server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});
