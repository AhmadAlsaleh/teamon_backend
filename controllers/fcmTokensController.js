const { FCMToken } = require("../models");

const addToken = async (req, res) => {
  const { userId, token } = req.body;
  try {
    const userFcmToken = await FCMToken.create({ userId, token });
    res.status(201).json({ code: 200, data: userFcmToken});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeToken = async (req, res) => {
  const { userId, token } = req.body;
  try {
    await FCMToken.destroy({ where: { userId, token } });
    res.status(200).json({ message: "Token removed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  addToken,
  removeToken,
};
