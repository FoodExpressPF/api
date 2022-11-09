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
    const order = req.query.order; //A-Z o Z-A
    const all = await getAll();
    if (order == "A-Z") {
      const alphabetical = all.sort((first, second) => {
        if (first.name.toUpperCase() > second.name.toUpperCase()) {
          return 1;
        }
        if (second.name.toUpperCase() > first.name.toUpperCase()) {
          return -1;
        }
        return 0;
      });

      return res.status(StatusCodes.OK).json(alphabetical);
    } else {
      const alphabetical = all.sort((first, second) => {
        if (first.name.toUpperCase() > second.name.toUpperCase()) {
          return -1;
        }
        if (second.name.toUpperCase() > first.name.toUpperCase()) {
          return 1;
        }
        return 0;
      });

      return res.status(StatusCodes.OK).json(alphabetical);
    }
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
});

module.exports = router;
