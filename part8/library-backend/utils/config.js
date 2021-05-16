require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  MONGODB_URI,
  JWT_SECRET,
};