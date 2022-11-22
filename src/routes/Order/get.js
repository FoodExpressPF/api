const router = require("express").Router();
const { Order, User, Foods_Order } = require("../../db");
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

/*router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const order_user = await Foods_Order.findAll({
      where: { userId: id },
      include: Order,
    });
    return res.status(200).res("order");
  } catch (error) {
    return res
      .status(error.status || StatusCodes.BAD_REQUEST)
      .send(error.reason || error);
  }
});
*/
module.exports = router;
