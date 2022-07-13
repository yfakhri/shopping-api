const routes = (handler) => [
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
  