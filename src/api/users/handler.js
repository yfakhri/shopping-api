const ClientError = require('../../exceptions/ClientError');

function handleError(error, h) {
  if (error instanceof ClientError) {
    const response = h.response({
      status: 'fail',
      message: error.message,
    });
    response.code(error.statusCode);
    return response;
  }

  // Server ERROR!
  const response = h.response({
    status: 'error',
    message: 'Maaf, terjadi kegagalan pada server kami.',
  });
  response.code(500);
  console.error(error);
  return response;
}

class UsersHandler {
  constructor(service, tokenManager) {
    this._service = service;
    this._tokenManager = tokenManager;

    this.signUpUserHandler = this.signUpUserHandler.bind(this);
    this.signInUserHandler = this.signInUserHandler.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  async signUpUserHandler(request, h) {
    try {
      const { user:{username, email, encrypted_password, phone, address, city, country, name, postcode} } = request.payload;

      const user = await this._service.addUser({ user:{ username, email, encrypted_password, phone, address, city, country, name, postcode}});
      const accessToken = this._tokenManager.generateAccessToken({ id:user.id });
      const response = h.response({
        email: user.email,
        token: accessToken,
        username: user.username
      });
      response.code(201);
      return response;
    } catch (error) {
      return handleError(error, h);
    }
  }
  async signInUserHandler(request, h) {
    try {
      const { email, password } = request.payload;

      const user = await this._service.verifyUserCredential(email, password);
      const accessToken = this._tokenManager.generateAccessToken({ id:user.id });
      const response = h.response({
        email: user.email,
        token: accessToken,
        username: user.username
      });
      response.code(201);
      return response;
    } catch (error) {
      return handleError(error, h);
    }
  }
  async getAllUsers(request, h){
    try{
        const users = await this._service.getUsers();
        const response = h.response({
            users:users
        })
        return response

    }catch (error) {
        return handleError(error, h);
    }
  }
  
}

module.exports = UsersHandler;
