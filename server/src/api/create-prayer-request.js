const { PrayerRequest } = require('../db/prayer-request');
const { Board } = require('../db/board');

module.exports = async (req, res) => {
  const { boardId, text, description } = req.body;

  if (!boardId || !text || !description) {
    return res.sendStatus(400);
  }

  try {
    const board = await Board.findById(boardId);

    if (!board) {
      return res.sendStatus(404);
    }

    const prayerRequest = new PrayerRequest({ text, description });
    board.prayerRequestIds = board.prayerRequestIds.concat(prayerRequest._id);
    await Promise.all([prayerRequest.save(), board.save()]);
    return res.send(prayerRequest);
  } catch (err) {
    return res.sendStatus(500);
  }
};
