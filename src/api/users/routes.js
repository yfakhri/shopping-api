const routes = (handler) => [
    {
      method: 'GET',
      path: '/api/users/',
      handler: handler.getAllUsers,
      options: {
        auth: 'shoppingapi_jwt',
      },
    },
    {
      method: 'POST',
      path: '/api/users/signup',
      handler: handler.signUpUserHandler,
    },
    {
      method: 'POST',
      path: '/api/users/signin',
      handler: handler.signInUserHandler,
    },
    
  ];
  
  module.exports = routes;
  