const { WorkStep } = require('../models');

const createWorkStep = async (req, res) => {
  try {
    const { dateTime, type, workSessionId } = req.body;
    const workStep = await WorkStep.create({ dateTime, type, workSessionId });
    res.status(201).json(workStep);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWorkStepsForSession = async (req, res) => {
  try {
    const { workSessionId } = req.params;
    const workSteps = await WorkStep.findAll({ where: { workSessionId } });
    res.status(200).json(workSteps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createWorkStep,
  getWorkStepsForSession,
};
