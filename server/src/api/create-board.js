const { Board } = require('../db/board');
const { User } = require('../db/user');

module.exports = async (req, res) => {
  const { userId, boardName } = req.body;

  if (!userId || !boardName) {
    return res.sendStatus(400);
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.sendStatus(400);
    }

    const board = new Board({
      name: boardName,
      adminUserId: userId,
      userIds: [userId]
    });

    await board.save();

    user.boardIds.push(board._id);
    await user.save();

    return res.send(board);
  } catch (err) {
    return res.sendStatus(500);
  }
};
