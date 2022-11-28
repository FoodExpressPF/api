const router = require("express").Router();
const { Foods } = require("../../db");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description, rating, image, type, category, offer, onStock } =
    req.body;

  //Cloudinary implementation
  const loadedImage = await cloudinary.uploader
  .upload(image, {upload_preset: 'foodExpress'});

  let update;
  try {
    update = await Foods.update(
      { name, price, description, rating, image:loadedImage.url, type, category, offer, onStock },
      { where: { id } }
    );

    if (update[0] == 0)
      throw {
        status: StatusCodes.NOT_MODIFIED,
        reason: ReasonPhrases.NOT_MODIFIED,
      };
    return res.status(StatusCodes.OK).json({ message: "Updated food" });
  } catch (error) {
    res.status(404).json({ error });
  }
});

module.exports = router;
