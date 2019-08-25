const greet = require('./greet/greet');

const createUser = require('./users/create-user');
const getUser = require('./users/get-user');

const createBoard = require('./boards/create-board');
const getBoard = require('./boards/get-board');
const addUserToBoard = require('./boards/add-user-to-board');
const removeUserFromBoard = require('./boards/remove-user-from-board');

const createPrayerRequest = require('./prayer-requests/create-prayer-request');
const deletePrayerRequest = require('./prayer-requests/delete-prayer-request');


module.exports = (app) => {
  app.get('/', greet);

  // users:
  app.post('/api/v1/users/create', createUser);
  app.get('/api/v1/users/:id', getUser);

  // boards:
  app.post('/api/v1/boards/create', createBoard);
  app.get('/api/v1/boards/:id', getBoard);
  app.put('/api/v1/boards/:id/add-user', addUserToBoard);
  app.delete('/api/v1/boards/:id/remove-user', removeUserFromBoard);

  // prayer requests:
  app.post('/api/v1/prayer-requests/create', createPrayerRequest);
  app.delete('/api/v1/prayer-requests/:id', deletePrayerRequest);
};
