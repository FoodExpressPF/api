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
    const order = req.query.order; // "Gluten Free","Vegetarian","Vegan","Protein","Others"
    const all = await getAll();

    const filtered = await all.filter((food) => food.type.includes(order));
    if (filtered.length !== 0) {
      return res.status(StatusCodes.OK).json(filtered);
    } else {
      return res
        .status(StatusCodes.OK)
        .send("There are no dishes with this category.");
    }
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
});

module.exports = router;
