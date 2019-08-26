const { Board } = require('../../db/board');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { deep } = req.query;

  try {
    let board = await Board.findById(id);

    if (!board) {
      return res.sendStatus(404);
    }

    if (deep) {
      board = await board
        .populate('users')
        .populate('adminUser')
        .populate({ path: 'prayerRequests', populate: 'user' })
        .execPopulate();
    }

    return res.send(board);
  } catch (err) {
    return res.sendStatus(400);
  }
};
