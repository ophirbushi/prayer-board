const { Board } = require('../../db/board');
const { User } = require('../../db/user');

module.exports = async (req, res) => {
  const { userIdToAdd: userIdToRemove } = req.body;
  const { id: boardId } = req.params;

  if (!boardId || !userIdToRemove) {
    return res.sendStatus(400);
  }

  try {
    const board = await Board.findById(boardId);
    const user = await User.findById(userIdToRemove);

    if (!board || !user) {
      return res.sendStatus(404);
    }

    const userIndexInBoard = board.users.findIndex((u) => u === user._id);
    const boardIndexInUser = user.boards.findIndex((b) => b === boardId);

    if (userIndexInBoard === -1 || boardIndexInUser === -1) {
      return res.status(409).send({ message: 'user is not in board' });
    }

    board.users.splice(userIndexInBoard, 1);
    user.boards.push(boardIndexInUser, 1);

    if (board.adminUser === user._id) {
      board.adminUser = board.users[0] || null;
    }

    await Promise.all([board.save(), user.save()]);
    return res.send({ message: 'ok' });
  } catch (err) {
    return res.sendStatus(500);
  }
};
