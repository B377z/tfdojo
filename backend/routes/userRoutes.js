// backend/routes/userRoutes.js
const express = require('express');
const { registerUser, authUser, getProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getProfile); // Ensure this route is protected

module.exports = router;
