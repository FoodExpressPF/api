const router = require("express").Router();

const getFoods = require("./foods/get");
const postFoods = require("./foods/post");


router.use("/foods", getFoods);
router.use("/foods/create", postFoods);

module.exports = router;