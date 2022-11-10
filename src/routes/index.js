const router = require("express").Router();

const getFoods = require("./foods/get.js");
const postFoods = require("./foods/post.js");


router.use("/foods", getFoods);
router.use("/foods/create", postFoods);

module.exports = router;