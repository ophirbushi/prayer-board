const { param, check } = require('express-validator');
const { PrayerRequest } = require('../../db/prayer-request');
const { User } = require('../../db/user');
const { createValidators } = require('../../utils/validators');
const { addUserNotification } = require('../../common/add-user-notification');

const notifyPraying = async (req, res) => {
  const { id } = req.params;
  const { prayingUserId } = req.body;

  try {
    const [prayerRequest, prayingUser] = await Promise.all([
      PrayerRequest.findById(id),
      User.findById(prayingUserId)]
    );
    if (!prayerRequest) {
      return res.status(404).json({ message: 'could not find prayer request with provided id' });
    }
    if (!prayingUser) {
      return res.status(404).json({ message: 'could not find praying user with provided id' });
    }

    await addUserNotification({
      userId: prayerRequest.user.toHexString(),
      notificationTitle: `${prayingUser.username} has been praying for you`,
      notificationDesc: `${prayingUser.username} has been praying for you regarding the prayer request: "${prayerRequest.title}"`
    });

    return res.json({ message: 'ok' });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

const notifyPrayingValidators = createValidators([
  param('id', 'id param is missing').exists({ checkFalsy: true }),
  check('prayingUserId', '"prayingUserId" is missing').exists({ checkFalsy: true })
]);

module.exports = {
  notifyPraying,
  notifyPrayingValidators
};
