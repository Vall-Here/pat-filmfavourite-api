const express = require('express');
const { protect } = require('../middlewares/auth');
const {
  getFavorites,
  addFavorite,
  removeFavorite
} = require('../controllers/favoriteController');

const router = express.Router();

router.use(protect);

router.get('/', getFavorites);
router.post('/:filmId', addFavorite);
router.delete('/:filmId', removeFavorite);

module.exports = router;