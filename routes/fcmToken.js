const express = require('express');
const router = express.Router();
const { addToken, removeToken } = require('../controllers/fcmTokensController');

router.post('/add-token', addToken);
router.post('/remove-token', removeToken);

module.exports = router;
