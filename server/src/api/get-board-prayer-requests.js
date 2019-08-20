const { Board } = require('../db/board');
const { PrayerRequest } = require('../db/prayer-request');

module.exports = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  try {
    const board = await Board.findById(id);

    if (!board) {
      return res.sendStatus(404);
    }

    const prayerRequests = await PrayerRequest.find({ _id: { $in: board.prayerRequestIds } });

    return res.send(prayerRequests);
  } catch (err) {
    return res.sendStatus(500);
  }
};
