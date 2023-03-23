const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');
const authMiddlewares = require('../middlewares/authMiddlewares');


router.route('/:id').all(authMiddlewares.protect).get(sensorController.getSensor)
    .patch(sensorController.updateSensor)
    .delete(sensorController.deleteSensor)
    .post(sensorController.addSensor)

module.exports = router;