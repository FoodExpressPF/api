const { Router } = require("express");
const {
  getAll,
  filterRating,
  filterPrice,
  filterOffer,
  filterAlphabetical,
  filterType,
} = require("./Functions");
const { StatusCodes } = require("http-status-codes");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const order = req.query.order;
    let all = await getAll();
    if (order.includes("rating")) {
      //lowest rating o highest rating
      all = await filterRating(all, order);
    }
    if (order.includes("price")) {
      //higher price o lower price
      all = await filterPrice(all, order);
    }
    if (order.includes("true") || order.includes("false")) {
      //true o false
      all = await filterOffer(all, order);
    }
    if (order.includes("A-Z") || order.includes("Z-A")) {
      //A-Z Z-A
      all = await filterAlphabetical(all, order);
    }
    if (
      order.includes("Gluten Free") ||
      order.includes("Vegetarian") ||
      order.includes("Vegan") ||
      order.includes("Protein") ||
      order.includes("Others")
      // "Gluten Free","Vegetarian","Vegan","Protein","Others"
    ) {
      all = await filterType(all, order);
    }
    if (all.length === 0)
      res.status(StatusCodes.NOT_FOUND).send("No results found");
    else res.status(StatusCodes.OK).json(all);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
});

module.exports = router;
