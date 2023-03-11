const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const cors = require('cors');
const mqtt = require('mqtt');
const db = require('./config/db');
const routes = require('./routes');
const errorHandleMiddlewares = require('./middlewares/errorHandleMiddlewares');

// Env variables
require("dotenv").config();

// Connect to DB
db.connect();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

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
    client.subscribe(`${ada_user}/feeds/bbc-temp`);
    console.log("Connected to adafruit feed");
});
// client.publish('<username>/feeds/<feed_key>', 'Hello, Adafruit!');


client.on('message', function(topic, message) {
    console.log('Received topic:', topic.toString());
    console.log('Received message:', message.toString());
});


app.get("/", (req, res) => {
    res.send("Successfully running !");
});

// Route 
routes(app);

app.use(errorHandleMiddlewares.errorHandler);

app.listen(port, () => {
    console.log(`App listening at port: ${port}`)
})