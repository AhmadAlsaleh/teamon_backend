const express = require('express');
const router = express.Router();
const workSessionController = require('../controllers/workSessionController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, workSessionController.createWorkSession);
router.get('/', authenticateToken, workSessionController.getWorkSessions);
router.post('/filter', authenticateToken, workSessionController.filterWorkSessions);

module.exports = router;
