require("dotenv").config();

/**********         URLS        ***********/
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
const PORT = process.env.PORT || '3001';

/**********        PAYPAL       ***********/
const CLIENT = "AVio_ncA_NfqHRuuZltEsSeAw-eTdIZl6lrnWV7ZCVh-PTd4KqBMMagIBPjX6psV89JCoLxpDb50jQwr";
const SECRET = "EIv0Q_vciHOLgKrHJfPskKlvCqpWC2Yv3U4zk3fMWu5DSRYybxS5HlR3CT4qy1wxs0RI7kuBop_HdEc8";
const AUTH_PAYPAL = { user: CLIENT, pass: SECRET };
const API_PAYPAL = "https://api-m.sandbox.paypal.com"; 

/**********     MERCADO PAGO    ***********/
const API_MERCADO = "https://api-m.sandbox.paypal.com"; 


module.exports = {
  CLIENT_URL,
  PORT,
  AUTH_PAYPAL,
  API_PAYPAL,
  API_MERCADO,
};