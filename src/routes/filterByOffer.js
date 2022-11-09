const { Router } = require("express");
const { getAll } = require("./Functions");
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const order = req.query.order; // true o false
    if (order == "true") {
      const all = await getAll();
      const filtered = await all.filter((food) => food.offer == true);
      if (filtered.length !== 0) {
        return res.status(StatusCodes.OK).json(filtered);
      } else {
        return res
          .status(StatusCodes.OK)
          .send("There are no offers at the moment.");
      }
    } else {
      const all = await getAll();
      const filtered = await all.filter((food) => food.offer == false);
      if (filtered.length !== 0) {
        return res.status(StatusCodes.OK).json(filtered);
      } else {
        return res.status(StatusCodes.OK).send("everything is in promotion.");
      }
    }
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
});

module.exports = router;
