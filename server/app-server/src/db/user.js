const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: String,
  boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
  prayerRequests: [{ type: Schema.Types.ObjectId, ref: 'PrayerRequest' }],
  mailbox: { type: Schema.Types.ObjectId, ref: 'UserMailbox' }
}, { timestamps: true });

const User = model('User', userSchema);

module.exports = {
  User
};
