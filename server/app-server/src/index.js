const { serviceName } = require('./config/config');
const server = require('./server/server');

console.log(`--- ${serviceName} ---`);
console.log('Service is up\n');

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception', err);
});

process.on('uncaughtRejection', (err) => {
  console.error('Uncaught rejection', err);
});

server.start();
