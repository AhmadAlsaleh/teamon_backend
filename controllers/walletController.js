const { UserWallet, WalletTransaction } = require("../models");

const getUserWallet = async (req, res) => {
  const { userId } = req.params;

  try {
    let wallet = await UserWallet.findOne({
      where: { userId },
      include: [{ model: WalletTransaction }],
    });

    if (!wallet) {
      await UserWallet.create({ userId, balance: 0.0 });
    }

    wallet = await UserWallet.findOne({
      where: { userId },
      include: [{ model: WalletTransaction }],
    });

    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addTransaction = async (req, res) => {
  const { userId, amount, type, description, referance } = req.body;

  try {
    let wallet = await UserWallet.findOne({ where: { userId } });

    if (!wallet) {
      wallet = await UserWallet.create({ userId, balance: 0.0 });
    }

    const transaction = await WalletTransaction.create({
      walletId: wallet.id,
      amount,
      type,
      description,
      referance,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTransaction = async (req, res) => {
  const { transactionId } = req.params;
  const { amount, type, description, referance } = req.body;

  try {
    const transaction = await WalletTransaction.findByPk(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transaction.amount = amount;
    transaction.type = type;
    transaction.description = description;
    transaction.referance = referance;

    await transaction.save();

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await WalletTransaction.findByPk(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    await transaction.destroy();

    res.status(200).json({ code: 200, message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserWallet,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
