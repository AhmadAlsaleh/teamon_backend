const { Notification, NotificationReceiver, User } = require("../models");
const notificationService = require("../services/notificationsService");

const sendNotification = async (req, res) => {
  const { title, body, senderId, userIds } = req.body;

  try {
    const notification = await notificationService.sendNotification(
      title,
      body,
      senderId,
      userIds
    );
    res
      .status(201)
      .json({ code: 200, message: "Notification sent successfully", notification });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSentNotifications = async (req, res) => {
  const { senderId } = req.params;

  try {
    const notifications = await Notification.findAll({
      where: { senderId },
      include: [
        { model: User, as: "Sender" },
        { model: NotificationReceiver, include: [User] },
      ],
    });

    res.status(200).json({ notifications });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getReceivedNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.findAll({
      include: [
        {
          model: NotificationReceiver,
          include: [User],
          where: { userId },
        },
        {
          model: User,
          as: "Sender",
        },
      ],
    });

    res.status(200).json({ notifications });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const readNotification = async (req, res) => {
  const { id, userId } = req.body;
  try {
    const notifications = await NotificationReceiver.update(
      {
        status: "read",
      },
      {
        where: { id, userId },
      }
    );

    res.status(200).json({ code: 200, notifications });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  sendNotification,
  getSentNotifications,
  getReceivedNotifications,
  readNotification,
};
