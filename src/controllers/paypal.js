const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const CLIENT =
  "AVio_ncA_NfqHRuuZltEsSeAw-eTdIZl6lrnWV7ZCVh-PTd4KqBMMagIBPjX6psV89JCoLxpDb50jQwr";
const SECRET =
  "EIv0Q_vciHOLgKrHJfPskKlvCqpWC2Yv3U4zk3fMWu5DSRYybxS5HlR3CT4qy1wxs0RI7kuBop_HdEc8";
const PAYPAL_API = "https://api-m.sandbox.paypal.com"; // Live https://api-m.paypal.com

const auth = { user: CLIENT, pass: SECRET };

const createPayment = (req, res) => {
  const { price } = req.body;
  const body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: price,
        },
      },
    ],
    application_context: {
      brand_name: `FoodExpress.app`,
      landing_page: "NO_PREFERENCE",
      user_action: "PAY_NOW",
      return_url: `http://localhost:3000/execute-payment`, // Url despues de realizar el pago
      cancel_url: `http://localhost:3000/cancel-payment`, // Url despues de realizar el pago
    },
  };

  request.post(
    `${PAYPAL_API}/v2/checkout/orders`,
    {
      auth,
      body,
      json: true,
    },
    (err, response) => {
      res.json({ data: response.body });
    }
  );
};

module.exports = createPayment;
