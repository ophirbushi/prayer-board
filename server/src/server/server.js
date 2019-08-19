const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('../config/config');
const api = require('../api/api');

const start = () => {
  mongoose.connect(config.databaseURI, { useNewUrlParser: true });

  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  api(app);

  return app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
};

module.exports = { start };
