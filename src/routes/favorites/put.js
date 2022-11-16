const router = require("express").Router();
const { Favorites } = require('../../db');
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

router.put("/", async(req,res)=>{
    const {userId, foodId} = req.body;
    try {
        let newFavorite = await Favorites.create({userId: userId, foodId: foodId});
        res.status(200).json(newFavorite);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;