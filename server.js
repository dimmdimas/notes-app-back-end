// Membuat Server
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: 'localhost',
    routes:{ cors: { origin: ['*'] } }
  });

  server.route(routes);

  await server.start();
  console.log(`Server is running : ${server.info.uri}`);
};

init();