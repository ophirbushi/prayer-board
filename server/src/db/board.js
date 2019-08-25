const { Schema, model } = require('mongoose');

const boardSchema = new Schema({
  name: String,
  adminUser: { type: Schema.Types.ObjectId, ref: 'User' },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  prayerRequests: [{ type: Schema.Types.ObjectId, ref: 'PrayerRequest' }]
}, {
  timestamps: true
});

const Board = model('Board', boardSchema);

module.exports = {
  Board
};
