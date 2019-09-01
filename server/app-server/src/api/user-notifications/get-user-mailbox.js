const { param } = require('express-validator');
const { createValidators } = require('../../utils/validators');
const { User } = require('../../db/user');

const getUserMailbox = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate('mailbox');
    if (!user || !user.mailbox) {
      return res.sendStatus(404);
    }
    return res.send(user.mailbox);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

const getUserMailboxValidators = createValidators([
  param('userId').exists({ checkFalsy: true })
]);

module.exports = {
  getUserMailbox,
  getUserMailboxValidators
};
