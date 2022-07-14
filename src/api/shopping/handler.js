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

class ShoppingHandler {
  constructor(service){
    this._service = service
    this.postShoppingHandler = this.postShoppingHandler.bind(this);
    this.getShoppingsHandler = this.getShoppingsHandler.bind(this);
    this.getShoppingByIdHandler = this.getShoppingByIdHandler.bind(this);
    this.putShoppingByIdHandler = this.putShoppingByIdHandler.bind(this);
    this.deleteShoppingByIdHandler = this.deleteShoppingByIdHandler.bind(this);
  }

  async postShoppingHandler(request, h){
    try{
      const {shopping: {createddate, name}} = request.payload 
      const shopping = await this._service.addShopping({ shopping:{ createddate, name}})
      const response = h.response({
        data:{
          createddate:shopping.createddate,
          id:shopping.id,
          name:shopping.name
        }
      });
      response.code(201);
      return response;
    }catch (error){
      return handleError(error,h)
    }
  }

  async getShoppingsHandler(request, h){
    try{
        const shoppings = await this._service.getShoppings();
        const response = h.response({
            shopping:shoppings
        })
        return response

    }catch (error) {
        return handleError(error, h);
    }
  }

  async getShoppingByIdHandler(request, h){
    try{
      const { shoppingId } = request.params;
      const shopping = await this._service.getShoppingById(shoppingId);
      const response = h.response({
        shopping
      })
      return response;
    }catch (error) {
      return handleError(error,h)
    }
  }

  async putShoppingByIdHandler(request, h){
    try{
      const { shoppingId } = request.params;
      const { shopping:{createddate, name} } = request.payload
      await this._service.editShoppingById(shoppingId,{shopping:{createddate, name}});

      return {
        status: 'success',
        message: 'shopping berhasil diperbarui',
      };
    }catch (error){
      return handleError(error,h)
    }
  }

  async deleteShoppingByIdHandler(request, h){
    try{
      const { shoppingId } = request.params;
      await this._service.deleteShoppingById(shoppingId);
      return {
        status: 'success',
        message: 'shopping berhasil dihapus',
      };
    }catch (error){
      return handleError(error, h)
    }
  }
}

module.exports = ShoppingHandler;