const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Change this line from /signup to /register
router.post('/register', userController.signup);
router.post('/login', userController.login);
router.get('/me', protect, userController.getCurrentUser);
router.patch('/updateMe', protect, userController.updateUser);

module.exports = router;