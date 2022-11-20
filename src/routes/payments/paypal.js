const router = require("express").Router();
const request = require("request");
const { StatusCodes } = require("http-status-codes");
const {
  CLIENT_URL,
  API_PAYPAL,
  AUTH_PAYPAL,
} = require("../../utils/envs.js");


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
      brand_name: "FoodExpress.app",
      landing_page: "NO_PREFERENCE",
      user_action: "PAY_NOW",
      return_url: `${CLIENT_URL}/passed`,
      cancel_url: `${CLIENT_URL}/denegated`,
    },
  };

  try{
    request.post(`${API_PAYPAL}/v2/checkout/orders`, {
      AUTH_PAYPAL,
      body,
      json: true,
    }, (_, response) => {
      return res
        .status(StatusCodes.ACCEPTED)
        .send({ data: response.body })
      ;
    });
  } catch (error) {
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error.reason || error)
    ;
  }
});

module.exports = router;