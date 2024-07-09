const express = require('express');
const router = express.Router();
const { addTransaction, getUserWallet, updateTransaction, deleteTransaction } = require('../controllers/walletController');

router.get('/:userId', getUserWallet);
router.post('/add-transaction', addTransaction);
router.put('/edit-transaction/:transactionId', updateTransaction);
router.delete('/delete-transaction/:transactionId', deleteTransaction);

module.exports = router;
