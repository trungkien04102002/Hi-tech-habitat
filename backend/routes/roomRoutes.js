const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddlewares = require('../middlewares/authMiddlewares');


router.route('/:id').all(authMiddlewares.protect).get(roomController.getOneRoom)
    .patch(roomController.updateOneRoom)
    .delete(roomController.deleteOneRoom)
router.route('/').all(authMiddlewares.protect).get(roomController.getRoomsOfUser)
    .post(roomController.addRoom)



module.exports = router;