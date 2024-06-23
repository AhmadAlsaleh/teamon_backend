const express = require('express');
const router = express.Router();
const { sendNotification, getSentNotifications, getReceivedNotifications, readNotification } = require('../controllers/notificationsController');

router.post('/send-notification', sendNotification);
router.get('/sent/:senderId', getSentNotifications);
router.get('/received/:userId', getReceivedNotifications);
router.post('/read-notification', readNotification);

module.exports = router;
