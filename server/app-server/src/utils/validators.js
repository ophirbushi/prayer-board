const { validationResult } = require('express-validator');

const createValidators = (validationChains) => [validationChains, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return next();
}];

module.exports = {
  createValidators
};
