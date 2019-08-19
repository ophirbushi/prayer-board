const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  boardIds: { type: [], default: [] }
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
