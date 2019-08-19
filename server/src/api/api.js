const greet = require('./greet');
const loginOrRegister = require('./login-or-register');
const findBoard = require('./find-board');
const createBoard = require('./create-board');

module.exports = (app) => {
  app.get('/', greet);
  app.post('/api/v1/login-register', loginOrRegister);
  app.get('/api/v1/boards/:id', findBoard);
  app.post('/api/v1/boards/create', createBoard);
};
