const pool = require('../config/db');

class Favorite {

  static async addFavorite(userId, filmId) {
    await pool.execute(
      'INSERT INTO favorites (user_id, film_id) VALUES (?, ?)',
      [userId, filmId]
    );
  }

  static async removeFavorite(userId, filmId) {
    await pool.execute(
      'DELETE FROM favorites WHERE user_id = ? AND film_id = ?',
      [userId, filmId]
    );
  }

  static async getUserFavorites(userId) {
    const [rows] = await pool.execute(`
      SELECT films.* 
      FROM films
      JOIN favorites ON films.id = favorites.film_id
      WHERE favorites.user_id = ?
    `, [userId]);
    return rows;
  }

  static async isFavorite(userId, filmId) {
    const [rows] = await pool.execute(
      'SELECT 1 FROM favorites WHERE user_id = ? AND film_id = ?',
      [userId, filmId]
    );
    return rows.length > 0;
  }
}

module.exports = Favorite;