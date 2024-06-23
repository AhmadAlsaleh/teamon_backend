const express = require('express');
const router = express.Router();
const workStepController = require('../controllers/workStepsController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, workStepController.createWorkStep);
router.get('/:workSessionId', authenticateToken, workStepController.getWorkStepsForSession);

module.exports = router;
