// Membuat Server
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '47.128.233.88',
    routes:{ cors: { origin: ['*'] } }
  });

  server.route(routes);

  await server.start();
  console.log(`Server is running : ${server.info.uri}`);
};

init();
