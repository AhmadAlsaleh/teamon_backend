const { WorkSession, WorkStep, User } = require("../models");
const { Op } = require('sequelize');

const createWorkSession = async (req, res) => {
  try {
    const { userId, date } = req.body;
    const session = await WorkSession.create({ userId, date });
    const workSessions = await WorkSession.findOne({
      where: { id: session.id },
      include: [
        { model: WorkStep, as: "workSteps" },
        { model: User, as: "user" },
      ],
    });
    res.status(201).json(workSessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const filterWorkSessions = async (req, res) => {
  try {
    const { start_date, end_date } = req.body;

    const workSessions = await WorkSession.findAll({
      where: {
        date: {
          [Op.gte]: start_date,
          [Op.lte]: end_date
        },
      },
      include: [
        { model: WorkStep, as: "workSteps" },
        { model: User, as: "user" },
      ],
    });
    res.status(200).json({ workSessions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWorkSessions = async (req, res) => {
  try {
    const { userId, date } = req.query;

    const workSessions = await WorkSession.findAll({
      where: { userId, date },
      include: [
        { model: WorkStep, as: "workSteps" },
        { model: User, as: "user" },
      ],
    });
    res.status(200).json({ workSessions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createWorkSession,
  getWorkSessions,
  filterWorkSessions,
};
