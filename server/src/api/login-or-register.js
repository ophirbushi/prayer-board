const { User } = require('../db/user');

module.exports = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.sendStatus(400);
  }

  try {
    let user = await User.findOne({ username });

    if (!user) {
      user = new User({ username });
      await user.save();
    }

    return res.send(user);
  } catch (err) {
    return res.sendStatus(500);
  }
};
