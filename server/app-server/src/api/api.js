const { authRequired } = require('./middlewares/auth-required');

const greet = require('./greet/greet');
const identityServiceGreet = require('./greet/identity-service-greet');

const { signup, signupValidators } = require('./auth/signup');
const { signin, signinValidators } = require('./auth/signin');

const getUser = require('./users/get-user');

const createBoard = require('./boards/create-board');
const getBoard = require('./boards/get-board');
const addUserToBoard = require('./boards/add-user-to-board');
const removeUserFromBoard = require('./boards/remove-user-from-board');

const createPrayerRequest = require('./prayer-requests/create-prayer-request');
const deletePrayerRequest = require('./prayer-requests/delete-prayer-request');


module.exports = (app) => {
  app.get('/', greet);
  app.get('/identity', identityServiceGreet);

  // auth:
  app.post('/api/v1/auth/signup', signupValidators, signup);
  app.post('/api/v1/auth/signin', signinValidators, signin);

  // users:
  // app.post('/api/v1/users/create', createUser);
  app.get('/api/v1/users/:id', authRequired, getUser);

  // boards:
  app.post('/api/v1/boards/create', authRequired, createBoard);
  app.get('/api/v1/boards/:id', authRequired, getBoard);
  app.put('/api/v1/boards/:id/add-user', authRequired, addUserToBoard);
  app.put('/api/v1/boards/:id/remove-user', authRequired, removeUserFromBoard);

  // prayer requests:
  app.post('/api/v1/prayer-requests/create', authRequired, createPrayerRequest);
  app.delete('/api/v1/prayer-requests/:id', authRequired, deletePrayerRequest);
};
