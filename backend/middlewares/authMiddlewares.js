const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')

class authMiddlewares {

    protect = asyncHandler(async(req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { _id: decodedToken._id };
            next();
        } catch {
            res.status(401)
            throw new Error('Not authorized, token failed');
        }
    })


    // protect = asyncHandler(async(req, res, next) => {
    //     if (req.headers.Authorization) {
    //         try {
    //             const token = req.header('Authorization').replace('Bearer ', '')
    //                 // let x = req.headers.Authorization.split(' ')[1]
    //                 //console.log(x);
    //             const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    //             req.user = { _id: decodedToken._id };
    //             next();
    //         } catch {
    //             res.status(401)
    //             throw new Error('Not authorized, token failed');
    //         }
    //     } else {
    //         res.status(401);
    //         throw new Error("Not authorization, no token");
    //     }
    // })

    isAdmin = asyncHandler(async(req, res, next) => {
        var user = await User.findById(req.user._id);
        if (user && user.roleUser == 'admin') {
            next();
        } else {
            res.status(401)
            throw new Error("Accessible by admin only!")
        }
    })
};

module.exports = new authMiddlewares;