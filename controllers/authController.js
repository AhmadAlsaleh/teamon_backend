const { generateToken } = require('../services/jwtService')
const { User, FCMToken } = require("../models");
const { comparePassword } = require("../services/passwordService");

const check = async (req, res) => {
  try {
    res.status(200).json({
      code: 200,
      message: "valid token",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { password, fullName, email, role, profession } = req.body;
    const user = await User.create({
      password,
      fullName,
      email,
      role,
      profession,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, deletedAt: null } });

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    var token = generateToken({ id: user.id, role: user.role });

    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    await FCMToken.destroy({ where: { userId: req.params.id } });
    res.status(200).json({ code: 200, message: "done" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, email } = req.body;
    const user = await User.findOne({ where: { email, deletedAt: null } });
    
    if (!user || !(await comparePassword(currentPassword, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const forgetPassword = async (req, res) => {
  // This implementation would typically involve sending a reset link to the user's email.
  res.status(501).json({ error: "Not implemented" });
};

const resetPassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body; // Assuming userId is sent with the request
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  check,
  register,
  login,
  logout,
  changePassword,
  forgetPassword,
  resetPassword,
};
