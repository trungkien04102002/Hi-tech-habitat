const express = require('express');
const router = express.Router();
const statisticController = require('../controllers/statisticController');
const authMiddlewares = require('../middlewares/authMiddlewares');

router.route('/time/:id').all(authMiddlewares.protect).get(statisticController.getStatisticDeviceInRoom)
router.route('/:id').all(authMiddlewares.protect).get(statisticController.getStatisticSensorInRoom)

module.exports = router;
