const mongoose = require('mongoose');

const prayerRequestSchema = new mongoose.Schema({
  title: String,
  text: String,
  status: String,
  createdAt: Date,
});

const PrayerRequest = mongoose.model('PrayerRequest', prayerRequestSchema);

module.exports = {
  PrayerRequest,
};
