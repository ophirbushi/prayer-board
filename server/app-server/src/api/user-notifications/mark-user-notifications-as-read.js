const { check } = require('express-validator');
const { createValidators } = require('../../utils/validators');
const { UserMailbox } = require('../../db/user-mailbox');

const markUserNotificationsAsRead = async (req, res) => {
  const { mailboxId } = req.body;

  try {
    const mailbox = await UserMailbox.findById(mailboxId);

    if (!mailbox) {
      return res.sendStatus(404);
    }

    mailbox.unreadNotificationsCount = 0;
    await mailbox.save();

    return res.send(mailbox);
  } catch (err) {
    return res.sendStatus(500);
  }
};

const markUserNotificationsAsReadValidators = createValidators([
  check('mailboxId').exists({ checkFalsy: true }).withMessage('"mailboxId" is missing')
]);

module.exports = {
  markUserNotificationsAsRead,
  markUserNotificationsAsReadValidators
};
