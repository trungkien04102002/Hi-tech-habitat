const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddlewares = require('../middlewares/authMiddlewares');

router.post('/register', userController.registerUser);
router.post('/auth', userController.authUser);

router.get('/', authMiddlewares.protect, userController.getUserProfile)
        .patch('/', authMiddlewares.protect, userController.updateUser);


module.exports = router;
