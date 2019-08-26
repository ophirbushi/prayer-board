module.exports = {
  serviceName: 'Prayer Board Service',
  databaseURI: process.env.databaseURI || 'mongodb://localhost:27017/prayer-board',
  port: 8080,
  identityServiceBaseUrl: process.env.identityServiceBaseUrl || 'http://localhost:8081'
};
