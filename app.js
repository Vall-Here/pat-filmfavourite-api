require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const filmRoutes = require('./routes/filmRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const errorHandler = require('./middlewares/errorHandler');
const swaggerSetup = require('./swagger');
const app = express();


swaggerSetup(app);
// Middleware
app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 10 
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/favorites', favoriteRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});