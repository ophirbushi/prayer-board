const mongoose = require('mongoose');

const prayerRequestSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'new' },
  createdAt: { type: Date, default: Date.now() }
});

const PrayerRequest = mongoose.model('PrayerRequest', prayerRequestSchema);

module.exports = {
  PrayerRequest
};
