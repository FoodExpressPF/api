const router = require("express").Router();
const { Order } = require("../../db");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

router.get("/", async (req, res) => {
  let orders;
  try {
    orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
