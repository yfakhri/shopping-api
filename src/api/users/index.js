const UsersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server, { service, tokenManager }) => {
    const usersHandler = new UsersHandler(service, tokenManager);
    server.route(routes(usersHandler));
  },
};
