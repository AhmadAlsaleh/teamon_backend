const { Notification, NotificationReceiver, FCMToken } = require("../models");
const { Op } = require("sequelize");
const admin = require("firebase-admin");
const serviceAccount = require("../notifications-server-private.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendNotification = async (title, body, senderId, userIds) => {
  try {
    const notification = await Notification.create({ title, body, senderId });

    const users = await FCMToken.findAll({
      where: { userId: userIds, token: { [Op.not]: null } },
      attributes: ["userId", "token"],
    });

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const token = user.token;

      const unread = await NotificationReceiver.findAll({
        where: { userId: user.userId, status: 'unread' }
      });

      const message = {
        notification: {
          title: title, 
          body: body,
        },
        data: {
          title: title,
          body: body,
        },
        android: {
          notification: {
            sound: "default",
          },
        },
        apns: {
          payload: {
            aps: {
              sound: "default",
              badge: unread.length + 1,
            },
          },
        },
        token: token,
      };
      try {
          await admin.messaging().send(message);
      } catch(e) {}
    }

    const receivers = userIds.map((userId) => ({
      notificationId: notification.id,
      userId,
      status: "unread",
    }));
    await NotificationReceiver.bulkCreate(receivers);

    return notification;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = {
  sendNotification,
};
