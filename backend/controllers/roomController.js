const User = require('../models/roomModel');


const asyncHandler = require('express-async-handler')


class RoomController {


 //  [ GET - ROUTE: api/room ]
    getRoomsOfUser = asyncHandler( async (req,res) => {
   
    })

 //  [GET - ROUTE: api/room/:id]  
    getOneRoom = asyncHandler( async (req,res) => {
  

    })

//  [PATCH - ROUTE: api/room/:id]  
    updateOneRoom = asyncHandler( async (req,res) => {


    })

//  [DELETE - ROUTE: api/room/:id]  
    deleteOneRoom = asyncHandler( async (req,res) => {


    })

//  [POST - ROUTE: api/room/]  
    addRoom = asyncHandler( async (req,res) => {


    })
}

module.exports = new RoomController;