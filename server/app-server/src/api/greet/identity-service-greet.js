const request = require('request-promise-native');
const { identityServiceBaseUrl } = require('../../config/config');

module.exports = async (req, res) => {
  try {
    const response = await request.get(`${identityServiceBaseUrl}`);
    return res.send(response);
  } catch (err) {
    return res.sendStatus(500);
  }
};
