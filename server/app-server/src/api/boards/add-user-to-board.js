const { Board } = require('../../db/board');
const { User } = require('../../db/user');

module.exports = async (req, res) => {
  const { username } = req.body;
  const { id: boardId } = req.params;

  if (!boardId || !username) {
    return res.sendStatus(400);
  }

  try {
    const board = await Board.findById(boardId);
    const user = await User.findOne({ username });

    if (!board || !user) {
      return res.sendStatus(404);
    }

    if (
      board.users.findIndex((u) => u.toHexString() === user._id) > -1
      || user.boards.findIndex((b) => b.toHexString() === boardId) > -1
    ) {
      return res.status(409).send({ message: 'user already in board' });
    }

    board.users.push(user._id);
    user.boards.push(board._id);

    await Promise.all([board.save(), user.save()]);
    return res.send({ message: 'ok' });
  } catch (err) {
    return res.sendStatus(500);
  }
};
