const router = require("express").Router();
const { Favorites } = require('../../db');
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

router.delete("/", async(req, res)=>{
    const {foodId} = req.body;

    try {
        const deletedFoodFromFavorites = await Favorites.destroy({where: {foodId: foodId}});
        res.status(202).json(deletedFoodFromFavorites); 
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;