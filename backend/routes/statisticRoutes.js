const express = require('express');
const router = express.Router();
const statisticController = require('../controllers/statisticController');
const authMiddlewares = require('../middlewares/authMiddlewares');


router.route('/:id').all(authMiddlewares.protect).get(statisticController.getStatisticInRoom)
module.exports = router;
