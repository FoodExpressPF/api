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
    const name = req.query.name; //http://localhost:3001/foods?name=....
    const all = await getAll();
    if (name) {
      const search = await all.filter((food) =>
        food.name.toLowerCase().includes(name.toLowerCase())
      );
      if (search.length !== 0) {
        return res.status(StatusCodes.OK).json(search);
      } else {
        res.status(StatusCodes.NOT_FOUND).send("dish not found");
      }
    } else {
      return res.status(StatusCodes.OK).json(all);
    }
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const all = await getAll();
    if (id) {
      const searchId = await all.filter((food) => food.id == id);

      if (searchId.length !== 0) {
        return res.status(StatusCodes.OK).json(searchId);
      } else {
        res.status(StatusCodes.NOT_FOUND).send("Sorry your dog not found");
      }
    }
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
});

module.exports = router;
