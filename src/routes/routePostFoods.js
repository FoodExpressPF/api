const { Router } = require("express");
const { Foods } = require("../db");
const { getAll } = require("./Functions");
const router = Router();
const {cloudinary} = require('../utils/cloudinary');
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");
const {cloudinary} = require('../utils/cloudinary')

router.post("/", async (req, res) => {
  try {
    const { name, price, description, rating, type, type_user, offer } = req.body;
    const encodedImage = req.body.image

    console.log('prueba',req.body)

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
          offer:false,
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
