const greet = require('./greet');
const findBoard = require('./find-board');

module.exports = (app) => {
  app.get('/', greet);
  app.get('/boards/:id', findBoard);
};
