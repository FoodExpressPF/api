const router = require("express").Router();

const getDietTypes = require("./get.js");
const postDietTypes = require("./post.js");

router.use("/", getDietTypes);
router.use("/", postDietTypes);


module.exports = router;