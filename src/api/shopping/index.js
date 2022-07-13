const UsersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'shopping',
  version: '1.0.0',
  register: async (server, { service }) => {
    const shoppingHandler = new ShoppingHandler(service);
    server.route(routes(shoppingHandler));
  },
};
