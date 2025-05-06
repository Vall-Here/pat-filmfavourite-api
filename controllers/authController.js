const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.register = async (req, res, next) => {
  try {
    const { nama, email, password } = req.body;
    const user = await User.create({ nama, email, password });
    const token = User.generateToken(user.id, user.role);

    res.status(201).json({ success: true, token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return next(new ErrorResponse('Email tidak terdaftar', 401));
    }

    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch) {
      return next(new ErrorResponse('Password salah', 401));
    }

    const token = User.generateToken(user.id, user.role);
    res.status(200).json({ success: true, token });
  } catch (err) {
    next(err);
  }
};
