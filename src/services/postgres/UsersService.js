const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ user:{ username, email, encrypted_password, phone, address, city, country, name, postcode}}) {
    const hashedPassword = await bcrypt.hash(encrypted_password, 10);

    const query = {
      text: 'INSERT INTO users (username, email, password, phone, address, city, country, name, postcode) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING email, username',
      values: [username, email, hashedPassword, phone, address, city, country, name, postcode],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('User gagal ditambahkan');
    }
    return result.rows[0];
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: 'SELECT id, password, email, username FROM users WHERE email = $1',
      values: [email],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const { id, password: hashedPassword, email_new, username } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }
    
    return result.rows[0];
  }

  async getUsers() {
    const result = await this._pool.query('SELECT * FROM users');
    return result.rows;
  }
}
module.exports = UsersService;