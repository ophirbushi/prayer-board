const { Board } = require('../db/board');

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    const board = await Board.findById(id);
    if (!board) {
      return res.sendStatus(404);
    }
    return res.send(board);
  } catch (err) {
    return res.sendStatus(400);
  }
};
