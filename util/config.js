if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT || 5050,
  JWT_KEY: process.env.JWT_SECRET
};
