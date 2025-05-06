const Film = require('../models/Film');
const ErrorResponse = require('../utils/errorResponse');

exports.getAllFilms = async (req, res, next) => {
  try {
    const films = await Film.getAll();
    res.status(200).json({ success: true, data: films });
  } catch (err) {
    next(err);
  }
};

exports.getFilmById = async (req, res, next) => {
  try {
    const film = await Film.getById(req.params.id);
    if (!film) {
      return next(new ErrorResponse('Film tidak ditemukan', 404));
    }
    res.status(200).json({ success: true, data: film });
  } catch (err) {
    next(err);
  }
};

exports.createFilm = async (req, res, next) => {
  try {
    const { judul, sutradara, tahun, genre, rating } = req.body;
    const film = await Film.create({ judul, sutradara, tahun, genre, rating });
    res.status(201).json({ success: true, data: film });
  } catch (err) {
    next(err);
  }
};

exports.updateFilm = async (req, res, next) => {
  try {
    const { judul, sutradara, tahun, genre, rating } = req.body;
    const updated = await Film.update(
      req.params.id,
      { judul, sutradara, tahun, genre, rating }
    );

    if (!updated) {
      return next(new ErrorResponse('Film tidak ditemukan', 404));
    }

    const film = await Film.getById(req.params.id);
    res.status(200).json({ success: true, data: film });
  } catch (err) {
    next(err);
  }
};

exports.deleteFilm = async (req, res, next) => {
  try {
    const deleted = await Film.delete(req.params.id);
    
    if (!deleted) {
      return next(new ErrorResponse('Film tidak ditemukan', 404));
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};