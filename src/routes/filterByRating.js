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
    const order = req.query.order; //lowest rating o highest rating
    const all = await getAll();
    if (order === "lowest rating") {
      const filtered = all.sort((first, second) => {
        if (parseFloat(first.rating) > parseFloat(second.rating)) {
          return 1;
        }
        if (parseFloat(second.rating) > parseFloat(first.rating)) {
          return -1;
        }
        return 0;
      });

      return res.status(StatusCodes.OK).json(filtered);
    } else {
      const filtered = all.sort((first, second) => {
        if (parseFloat(first.rating) > parseFloat(second.rating)) {
          return -1;
        }
        if (parseFloat(second.rating) > parseFloat(first.rating)) {
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
