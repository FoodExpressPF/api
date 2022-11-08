const { Router } = require("express");
const { Foods } = require("../db");
const { getAll } = require("./Functions");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, price, description, rating, image, type, type_user } =
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
        });

        res.status(201).json({ success: "Food succesfully created!" });
      } else {
        res
          .status(201)
          .json({ success: "the name entered already exists in the database" });
      }
    } else {
      res
        .status(201)
        .json({ success: "Function only enabled for administrators" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
module.exports = router;
