const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const authMiddlewares = require('../middlewares/authMiddlewares');

router.route('/mode/:id').all(authMiddlewares.protect).post(deviceController.addModeDevice)
router.route('/state/:id').all(authMiddlewares.protect).post(deviceController.addStateDevice)
router.route('/:id').all(authMiddlewares.protect).get(deviceController.getDevice)
    .patch(deviceController.updateDevice)
    .delete(deviceController.deleteDevice)
    .post(deviceController.addDevice)


module.exports = router;