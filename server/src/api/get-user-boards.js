const { User } = require('../db/user');
const { Board } = require('../db/board');

module.exports = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.sendStatus(400);
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.sendStatus(404);
  }

  try {
    const boards = await Board.find({
      _id: { $in: user.boardIds }
    });
    return res.send(boards);
  } catch (err) {
    return res.sendStatus(500);
  }
};
