const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  adminUserId: String,
  userIds: [String],
});

const Board = mongoose.model('Board', boardSchema);

module.exports = {
  Board,
};