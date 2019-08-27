const request = require('request-promise-native');
const { identityServiceBaseUrl } = require('../../config/config');

const authRequired = async (req, res, next) => {
  const unauthorizedError = new Error('unauthorized');
  unauthorizedError.status = 401;

  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return next(unauthorizedError);
  }

  // eslint-disable-next-line no-unused-vars
  const [_, token] = authHeader.split('Bearer ');

  if (!token) {
    return next(unauthorizedError);
  }

  try {
    await request.post(`${identityServiceBaseUrl}/api/v1/authenticate`, {
      json: true,
      body: { token }
    });

    return next();
  } catch (err) {
    switch (err.statusCode) {
      case 401:
        return next(unauthorizedError);
      case 440:
        return next(440);
      default:
        return next(err);
    }
  }
};

module.exports = {
  authRequired
};
