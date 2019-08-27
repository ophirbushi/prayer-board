const request = require('request-promise-native');
const { validationResult, check } = require('express-validator');
const { identityServiceBaseUrl } = require('../../config/config');
const { User } = require('../../db/user');

const signin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;

    const token = await request.post(`${identityServiceBaseUrl}/api/v1/login`, {
      json: true,
      body: { username, password }
    });

    const user = await User.findOne({ username });

    res.set({
      'Access-Control-Expose-Headers': 'Authorization',
      Authorization: `Bearer ${token}`
    });

    return res.send(user);
  } catch (err) {
    if (err.statusCode === 401) {
      return res.status(err.statusCode).json({ message: 'bad signin attempt' });
    }
    return res.sendStatus(500);
  }
};

const signinValidators = [
  check('username').exists({ checkFalsy: true }).withMessage('username field is missing'),
  check('password').exists({ checkFalsy: true }).withMessage('password field is missing')
];

module.exports = {
  signinValidators,
  signin
};
