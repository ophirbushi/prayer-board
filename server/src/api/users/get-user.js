const { parseStringArray } = require('../../utils/strings');
const { User } = require('../../db/user');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { populate } = req.query;

  if (!id) {
    return res.sendStatus(400);
  }

  try {
    let user = await User.findById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    if (populate) {
      const propertiesToPopulate = parseStringArray(populate);
      user = await user.populate(propertiesToPopulate).execPopulate();
    }

    return res.send(user);
  } catch (err) {
    return res.sendStatus(500);
  }
};
