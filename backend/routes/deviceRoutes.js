const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const authMiddlewares = require('../middlewares/authMiddlewares');

router.route('/:id').all(authMiddlewares.protect).get(deviceController.getDevice)
    .patch(deviceController.updateDevice)
    .delete(deviceController.deleteDevice)
    .post(deviceController.addDevice)


module.exports = router;