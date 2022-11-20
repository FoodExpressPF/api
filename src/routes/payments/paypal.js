const router = require("express").Router();
const CLIENT_URL = require("../../utils/envs.js");

const auth = { user: CLIENT, pass: SECRET };

router.post("/", async (req, res) => {
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
      return_url: `${CLIENT_URL}/passed`, // Url despues de realizar el pago
      cancel_url: `${CLIENT_URL}/denegated`, // Url despues de realizar el pago
    },
  };
  
  request.post(`${PAYPAL_API}/v2/checkout/orders`, {
      auth,
      body,
      json: true,
    }, (err, response) => {
      res.json({ data: response.body });
    }
  );
});

module.exports = router;