const { Schema, model } = require('mongoose');

const userMailboxSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  userNotifications: [{ type: Schema.Types.ObjectId, ref: 'UserNotification' }],
  unreadNotificationsCount: Number
}, { timestamps: true });

const UserNotification = model('UserMailbox', userMailboxSchema);

module.exports = {
  UserNotification
};
