const router = require("express").Router();
const { Favorites, Foods, User} = require('../../db');
const { ReasonPhrases, StatusCodes } = require("http-status-codes");



router.get("/", async(req, res)=>{
    const {userId} = req.body;
    
    try {
        const favorites = await User.findOne({where : {id: userId},include: Foods});
        res.json(favorites.foods);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;