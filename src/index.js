const server = require('./app.js');
const { conn } = require('./db.js');

require("dotenv").config();
const PORT = process.env.PORT || '3001';

conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});