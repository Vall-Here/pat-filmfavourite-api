const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('Akses ditolak, harap login', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return next(new ErrorResponse('User tidak ditemukan', 401));
    }

    req.user = {
      id: user.id,
      role: user.role
    };
    
    next();
  } catch (err) {
    return next(new ErrorResponse('Token tidak valid', 401));
  }
};

exports.adminCheck = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new ErrorResponse('Akses ditolak, hanya untuk admin', 403));
  }
  next();
};