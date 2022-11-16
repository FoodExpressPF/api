const router = require("express").Router();

const getFoods = require("./foods/get.js");
const postFoods = require("./foods/post.js");
const postUser = require("./user/post.js");
const getUser = require("./user/get.js");
const deleteUser = require("./user/delete.js");
const updateUser = require("./user/update.js");
const getFavorites = require("./favorites/get.js");
const putFavorites = require("./favorites/put.js");
const deleteFavorites = require("./favorites/delete.js");

router.use("/foods", getFoods);
router.use("/foods/create", postFoods);
router.use("/user/create", postUser);
router.use("/user/delete", deleteUser);
router.use("/user", getUser);
router.use("/user/update", updateUser);
router.use("/favorites/get", getFavorites);
router.use("/favorites/put", putFavorites);
router.use("/favorites/delete", deleteFavorites);
module.exports = router;