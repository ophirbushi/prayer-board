const { addUserNotification: addUserNotificationAction } = require('../../common/add-user-notification');

const addUserNotification = async (req, res) => {
  const { userId } = req.params;
  const { title: notificationTitle, desc: notificationDesc } = req.body;

  try {
    await addUserNotificationAction({ userId, notificationTitle, notificationDesc });
    return res.send({ message: 'ok' });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  addUserNotification
};
