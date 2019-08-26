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

    const userIndexInBoard = board.users.findIndex((u) => u.toHexString() === user.id);
    const boardIndexInUser = user.boards.findIndex((b) => b.toHexString() === boardId);

    if (userIndexInBoard === -1 || boardIndexInUser === -1) {
      return res.status(409).send({ message: 'user is not in board' });
    }

    board.users.splice(userIndexInBoard, 1);
    user.boards.splice(boardIndexInUser, 1);

    if (board.adminUser.toHexString() === user.id) {
      board.adminUser = board.users[0] || null;
    }

    await Promise.all([board.save(), user.save()]);
    return res.send({ message: 'ok' });
  } catch (err) {
    return res.sendStatus(500);
  }
};
