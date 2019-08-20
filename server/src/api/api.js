const greet = require('./greet');
const loginOrRegister = require('./login-or-register');
const findBoard = require('./find-board');
const createBoard = require('./create-board');
const getBoardPrayerRequests = require('./get-board-prayer-requests');
const getUserBoards = require('./get-user-boards');
const createPrayerRequest = require('./create-prayer-request');

module.exports = (app) => {
  app.get('/', greet);
  app.post('/api/v1/login-register', loginOrRegister);
  app.get('/api/v1/boards/:id', findBoard);
  app.post('/api/v1/boards/create', createBoard);
  app.get('/api/v1/boards/:id/prayer-requests', getBoardPrayerRequests);
  app.get('/api/v1/users/:userId/boards', getUserBoards);
  app.post('/api/v1/prayer-requests/create', createPrayerRequest);
};
