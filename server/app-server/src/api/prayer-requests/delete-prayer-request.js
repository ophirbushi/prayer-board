const { PrayerRequest } = require('../../db/prayer-request');

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    await PrayerRequest.findByIdAndRemove(id);
    return res.send({ message: 'ok' });
  } catch (err) {
    return res.sendStatus(500);
  }
};
