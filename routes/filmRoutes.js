const express = require('express');
const { protect, adminCheck } = require('../middlewares/auth');
const {
  getAllFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm
} = require('../controllers/filmController');

const router = express.Router();

// Public routes
router.get('/', getAllFilms);
router.get('/:id', getFilmById);

// Protected admin routes
router.use(protect, adminCheck);
router.post('/', createFilm);
router.put('/:id', updateFilm);
router.delete('/:id', deleteFilm);

module.exports = router;