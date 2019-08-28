const { Schema, model } = require('mongoose');

const userMailboxSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  userNotifications: [{ type: Schema.Types.ObjectId, ref: 'UserNotification' }],
  unreadNotificationsCount: { type: Number, default: 0 }
}, { timestamps: true });

const UserMailbox = model('UserMailbox', userMailboxSchema);

module.exports = {
  UserMailbox
};
