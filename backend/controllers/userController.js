const User = require('../models/userModel');

const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler')


class UserController {

    //  [ POST - ROUTE: api/user/register ]
    registerUser = asyncHandler(async(req, res) => {
        const { name, email, password, contact } = req.body;
        const user = await User.findOne({ $or: [{ email }, { name }] });
        if (!user) {
            var salt = await bcrypt.genSalt(10);
            var hashPassword = await bcrypt.hash(password, salt);
            const newUser = await User.create({
                name,
                email,
                contact,
                password: hashPassword
            });
            if (newUser) {
                res.json({
                    _id: newUser._id,
                    name,
                    email,
                    contact,
                    createdAt: newUser.createdAt
                });
            } else {
                res.status(501);
                throw new Error('Fail to resister new user!');
            }
        } else {
            res.status(404);
            throw new Error('User has already existed!');
        }

    })

    //  [ POST - ROUTE: api/user/auth ]
    authUser = asyncHandler(async(req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                contact: user.contact,
                createdAt: user.createdAt,
                token: generateToken(user._id)
            });
        } else {
            res.status(401);
            throw new Error("Invalid UserName or Password");
        }
    })


    //  [ GET - ROUTE: api/user ]
    getUserProfile = asyncHandler(async(req, res) => {
        var user = await User.findById(req.user._id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                contact: user.contact,
                createdAt: user.createdAt,
            })
        } else {
            res.status(404);
            throw new Error('User does not exist!');
        }
    })

    //  [PATCH - ROUTE: api/user/update/]  
    updateUser = asyncHandler(async(req, res) => {
        var user = await User.findById(req.user._id);
        if (user) {
            if (req.body.password) {
                var salt = await bcrypt.genSalt(10);
                var hashPassword = await bcrypt.hash(req.body.password, salt);
                user.password = hashPassword;
            }
            var updateUser = await User.findOneAndUpdate({ _id: user._id }, {
                name: req.body.name || user.name,
                email: req.body.email || user.email,
                contact: req.body.contact || user.contact,
                password: hashPassword,
                token: generateToken(user._id),
            }, {
                new: true
            });
            res.json(updateUser);
        } else {
            res.status(404);
            throw new Error('User does not exist!');
        }
    })

}

module.exports = new UserController;