const Favorite = require('../models/Favorite');
const Film = require('../models/Film');
const ErrorResponse = require('../utils/errorResponse');

exports.getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.getUserFavorites(req.user.id);
    res.status(200).json({ success: true, data: favorites });
  } catch (err) {
    next(err);
  }
};

exports.addFavorite = async (req, res, next) => {
  try {
    const film = await Film.getById(req.params.filmId);
    if (!film) {
      return next(new ErrorResponse('Film tidak ditemukan', 404));
    }

    const isFavorite = await Favorite.isFavorite(req.user.id, req.params.filmId);
    if (isFavorite) {
      return next(new ErrorResponse('Film sudah ada di favorit', 400));
    }

    await Favorite.addFavorite(req.user.id, req.params.filmId);
    res.status(200).json({ success: true, data: film });
  } catch (err) {
    next(err);
  }
};

exports.removeFavorite = async (req, res, next) => {
  try {
    const isFavorite = await Favorite.isFavorite(req.user.id, req.params.filmId);
    if (!isFavorite) {
      return next(new ErrorResponse('Film tidak ada di favorit', 400));
    }

    await Favorite.removeFavorite(req.user.id, req.params.filmId);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};