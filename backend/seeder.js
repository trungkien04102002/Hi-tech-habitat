const db = require('./config/db');
const bcrypt = require("bcryptjs");

var users = require('./data/user.js');


const User = require('./models/userModel');
const Room = require('./models/roomModel');
const Device = require('./models/deviceModel');
const Sensor = require('./models/sensorModel');

// const Dish = require('./models/dishModel');
// const Category = require('./models/categoryModel');
// const Cart = require('./models/cartModel');
// const Order = require('./models/orderModel');
// const ResetToken = require('./models/resetTokenModel');

// For .env access
require("dotenv").config();

// Connect to DB
db.connect();


const importData = async() => {
    try {
        const newUsers = await Promise.all(users.map(async(user) => {
            var salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            return user;
        }));

        await User.deleteMany();
        await Room.deleteMany();
        await Device.deleteMany();
        await Sensor.deleteMany();

        const importedUsers = await User.insertMany(newUsers);

        const rooms = [{
                name: 'Living Room ',
                roomType: 'Living Room',
                user: importedUsers[0]._id
            },
            {
                name: 'Bed Room',
                roomType: 'Bed Room',
                user: importedUsers[0]._id
            },
            {
                name: 'Kitchen',
                roomType: 'Kitchen Room',
                user: importedUsers[0]._id
            },
            {
                name: 'Living Room',
                roomType: 'Living Room',
                user: importedUsers[1]._id
            },
            {
                name: 'Bed Room',
                roomType: 'Bed Room',
                user: importedUsers[1]._id
            },
            {
                name: 'Kitchen',
                roomType: 'Kitchen Room',
                user: importedUsers[1]._id
            }
        ];

        const importedRooms = await Room.insertMany(rooms);

        // Create carts for customer accounts
        // var customers = await Promise.all(importedUsers.filter(
        //     e => e.roleUser == "customer"
        // ));
        // var carts = await Promise.all(customers.map(async(customer) => {
        //     return { user: customer._id, orderList: [] };
        // }));
        // await Cart.insertMany(carts);

        console.log("Sucessfully imported data in database!");
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};
const destroyData = async() => {
    try {
        await User.deleteMany();
        await Room.deleteMany();
        await Device.deleteMany();
        await Sensor.deleteMany();
        console.log("Sucessfully destroyed data in database!");
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}