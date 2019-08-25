const { serviceName } = require('../../config/config');

module.exports = (req, res) => {
  res.send({
    serviceName,
    apiVersion: 1
  });
};
