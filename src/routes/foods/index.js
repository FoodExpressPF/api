const router = require("express").Router();

const getFoods = require("./get.js");
const postFoods = require("./post.js");

router.use("/", getFoods);
router.use("/create", postFoods);

module.exports = router;