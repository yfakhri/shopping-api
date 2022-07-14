require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// users 
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');

//token
const TokenManager = require('./tokenize/TokenManager');

//shopping
const shopping = require('./api/shopping');
const ShoppingService = require('./services/postgres/ShoppingService')

const init = async () => {
  const usersService = new UsersService();
  const shoppingService = new ShoppingService();


  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('shoppingapi_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        tokenManager: TokenManager,
      },
    },
    {
      plugin: shopping,
      options: {
        service: shoppingService,
      },
    },
  ]);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
}

init();