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
    const order = req.query.order; //from oldest to youngest o from smallest to largest
    const all = await getAll();
    if (order === "from smallest to largest") {
      const filtered = all.sort((first, second) => {
        if (parseInt(first.price) > parseInt(second.price)) {
          return 1;
        }
        if (parseInt(second.price) > parseInt(first.price)) {
          return -1;
        }
        return 0;
      });

      return res.status(StatusCodes.OK).json(filtered);
    } else {
      const filtered = all.sort((first, second) => {
        if (parseInt(first.price) > parseInt(second.price)) {
          return -1;
        }
        if (parseInt(second.price) > parseInt(first.price)) {
          return 1;
        }
        return 0;
      });

      return res.status(StatusCodes.OK).json(filtered);
    }
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
});

module.exports = router;
