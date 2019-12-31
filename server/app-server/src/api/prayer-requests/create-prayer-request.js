const { PrayerRequest } = require('../../db/prayer-request');
const { Board } = require('../../db/board');
const { User } = require('../../db/user');

module.exports = async (req, res) => {
  const {
    boardId, title, description, userId
  } = req.body;

  if (!boardId || !title || !description || !userId) {
    return res.sendStatus(400);
  }

  try {
    const [board, user] = await Promise.all([Board.findById(boardId), User.findById(userId)]);

    if (!board || !user) {
      return res.sendStatus(404);
    }

    const prayerRequest = new PrayerRequest({ title, description, user: userId });
    board.prayerRequests = [prayerRequest._id, ...board.prayerRequests];
    user.prayerRequests = [prayerRequest._id, ...user.prayerRequests];

    await Promise.all([prayerRequest.save(), board.save(), user.save()]);

    return res.send(prayerRequest);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};
