const greet = require('./greet');

module.exports = (app) => {
  app.get('/', greet);
};
