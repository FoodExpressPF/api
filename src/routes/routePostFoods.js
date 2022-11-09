const { Router } = require("express");
const { Foods } = require("../db");
const { getAll } = require("./Functions");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, price, description, rating, type, type_user } =
      req.body;
    const encodedImage = req.body.image

    if (type_user == "Admin") {
      const exists = await getAll();
      const check = await exists.filter((food) => {
        if (food.name == name) return name;
      });

      //Cloudinary implementation
      const loadedImage = await cloudinary.uploader
       .upload(encodedImage, {upload_preset: 'foodExpress'})
      const image = loadedImage.url

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
