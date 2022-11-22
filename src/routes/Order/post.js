const router = require("express").Router();
const { Order } = require("../../db");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

router.post("/", async (req, res) => {
  const { coments, address, total } = req.body;

  try {
    const newOrder = await Order.create({
      coments,
      address,
      total,
    });
    res.status(StatusCodes.ACCEPTED).json({ Order: "created" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
});

module.exports = router;
