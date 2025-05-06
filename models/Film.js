const pool = require('../config/db');

class Film {
  static async create({ judul, sutradara, tahun, genre, rating = 0 }) {
    const [result] = await pool.execute(
      'INSERT INTO films (judul, sutradara, tahun, genre, rating) VALUES (?, ?, ?, ?, ?)',
      [judul, sutradara, tahun, JSON.stringify(genre), rating]
    );
    return { id: result.insertId, judul, sutradara, tahun, genre, rating };
  }

  static async getAll() {
    const [rows] = await pool.execute('SELECT * FROM films');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.execute('SELECT * FROM films WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, { judul, sutradara, tahun, genre, rating }) {
    const [result] = await pool.execute(
      `UPDATE films 
       SET judul = ?, sutradara = ?, tahun = ?, genre = ?, rating = ?
       WHERE id = ?`,
      [judul, sutradara, tahun, JSON.stringify(genre), rating, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await pool.execute('DELETE FROM films WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Film;