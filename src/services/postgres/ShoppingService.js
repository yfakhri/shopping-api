const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class ShoppingService {
  constructor() {
    this._pool = new Pool();
  }

  async addShopping({ shopping:{ createddate, name}}) {
    

    const query = {
      text: 'INSERT INTO shopping (name, createddate) VALUES($1, $2 ) RETURNING id, createddate, name',
      values: [createddate,name],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Shopping gagal ditambahkan');
    }
    return result.rows[0];
  }

  async getShoppingById(id){
    const query = {
        text: 'SELECT * FROM shopping where id = $1',
        values: [id],
      };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
        throw new NotFoundError('Shopping tidak ditemukan');
      }

      return result.rows[0]
  }

  async getShoppings() {
    const result = await this._pool.query('SELECT * FROM shopping');
    return result.rows;
  }

  async editShoppingById(id,{shopping:{createddate, name}}){
    const query = {
        text: 'UPDATE shopping SET createddate = $1, name = $2 WHERE id = $3 RETURNING id',
        values: [createddate,name,id],
      };
      const result = await this._pool.query(query);
      if (!result.rows.length) {
        throw new NotFoundError('Gagal memperbarui shopping. Id tidak ditemukan');
      }
  }

  async deleteShoppingById(id) {
    const query = {
      text: 'DELETE FROM shopping WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Shopping gagal dihapus. Id tidak ditemukan');
    }
  }

  async getShopping() {
    const result = await this._pool.query('SELECT * FROM shopping');
    return result.rows;
  }
}
module.exports = Shopping;