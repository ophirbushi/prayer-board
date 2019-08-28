const { Schema, model } = require('mongoose');

const userNotificationSchema = new Schema({
  text: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  userMailbox: { type: Schema.Types.ObjectId, ref: 'UserMailbox' }
}, { timestamps: true });

const UserNotification = model('UserNotification', userNotificationSchema);

module.exports = {
  UserNotification
};
