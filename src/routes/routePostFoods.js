const { Router } = require("express");
const { Foods } = require("../db");
const { getAll } = require("./Functions");
const router = Router();
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");

router.post("/", async (req, res) => {
  try {
    const { name, price, description, rating, image, type, offer, type_user } =
      req.body;
    if (type_user == "Admin") {
      const exists = await getAll();
      const check = await exists.filter((food) => {
        if (food.name == name) return name;
      });

      if (check.length == 0) {
        await Foods.create({
          name,
          price,
          description,
          rating,
          image,
          type,
          offer,
        });

        res
          .status(StatusCodes.CREATED)
          .json({ success: "Food succesfully created!" });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: "the name entered already exists in the database" });
      }
    } else {
      res
        .status(StatusCodes.LOCKED)
        .json({ success: "Function only enabled for administrators" });
    }
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
});
module.exports = router;
