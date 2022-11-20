require("dotenv").config();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

const PORT = process.env.PORT || '3001';

module.exports = {
  CLIENT_URL,
  PORT
};