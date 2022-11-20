const router = require("express").Router();
const { StatusCodes } = require("http-status-codes");
const createPayment = require("../../controllers/createPayment.js");

router.post("/", (req, res) => {
  const { total } = req.body;
  try {
    const paymentData = createPayment(total);
    if(!paymentData) throw {
      status: StatusCodes.BAD_REQUEST,
      reason: "Payment Data not available",
    };
  } catch (error) {
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error.reason || error)
    ;
  }
});

module.exports = router;