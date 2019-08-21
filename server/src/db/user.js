const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
  prayerRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PrayerRequest' }]
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
