const routes = (handler) => [
    {
      method: 'GET',
      path: '/api/shopping',
      handler: handler.getShoppingsHandler,
      options: {
        auth: 'shoppingapi_jwt',
      },
    },
    {
        method: 'GET',
        path: '/api/shopping/{shoppingId}',
        handler: handler.getShoppingByIdHandler,
        options: {
          auth: 'shoppingapi_jwt',
        },
      },
    {
      method: 'POST',
      path: '/api/shopping',
      handler: handler.postShoppingHandler,
    },
    {
      method: 'PUT',
      path: '/api/shopping/{shoppingId}',
      handler: handler.putShoppingByIdHandler,
      options: {
        auth: 'shoppingapi_jwt',
      },
    },
    {
      method: 'DELETE',
      path: '/api/shopping/{shoppingId}',
      handler: handler.deleteShoppingByIdHandler,
      options: {
        auth: 'shoppingapi_jwt',
      },
    },
    
  ];
  
  module.exports = routes;
  