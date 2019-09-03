const { User } = require('../db/user');
const { UserMailbox } = require('../db/user-mailbox');
const { UserNotification } = require('../db/user-notification');

const addUserNotification = async ({ userId, notificationTitle, notificationDesc }) => {
  if (!userId) {
    throw new Error('userId is missing');
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error('Could not find user by id');
  }

  const mailbox = await UserMailbox.findById(user.mailbox.toHexString());

  if (!mailbox) {
    throw new Error('Could not find mailbox by id');
  }

  const notification = new UserNotification({
    user: user._id,
    mailbox: mailbox._id,
    title: notificationTitle,
    description: notificationDesc
  });

  mailbox.userNotifications.unshift(notification._id);
  mailbox.unreadNotificationsCount += 1;

  await Promise.all([notification.save(), mailbox.save()]);
};

module.exports = {
  addUserNotification
};
