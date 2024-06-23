const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, (req, res) => {
    res.send("HI Admin");
});

router.get('/check', authenticateToken, authController.check);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout/:id', authController.logout);
router.post('/change-password', authenticateToken, authController.changePassword);
router.post('/forget-password', authController.forgetPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
