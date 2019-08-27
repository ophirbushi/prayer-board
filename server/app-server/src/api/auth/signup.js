const request = require('request-promise-native');
const { validationResult, check } = require('express-validator');
const { identityServiceBaseUrl } = require('../../config/config');
const { User } = require('../../db/user');

const signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;

    const token = await request.post(`${identityServiceBaseUrl}/api/v1/signup`, {
      json: true,
      body: { username, password }
    });

    const user = new User({ username });
    await user.save();

    res.set({
      'Access-Control-Expose-Headers': 'Authorization',
      Authorization: `Bearer ${token}`
    });

    return res.send(user);
  } catch (err) {
    if (err.statusCode === 409) {
      return res.status(err.statusCode).json({ message: 'user already exists' });
    }
    return res.sendStatus(500);
  }
};

const signupValidators = [
  check('username')
    .exists().withMessage('username field is missing')
    .isLength({ min: 4 }).withMessage('username should be at least 4 characters long'),
  check('password')
    .exists().withMessage('password field is missing')
    .isLength({ min: 6 }).withMessage('password should be at least 6 characters'
      + ' long')
];

module.exports = {
  signupValidators,
  signup
};
