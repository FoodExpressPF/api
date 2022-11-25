const router = require('express').Router();
const {Reviews, User} = require("../../db.js");

router.get("/", async (req, res)=>{
    try {
        const reviews = await Reviews.findAll();
        res.status(200).json({reviews});
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

router.get('/byFood',async (req, res)=>{
    const {foodId} = req.body;
    try {
        const reviews = await Reviews.findAll({where: {foodId},include: User});
        res.status(200).json(reviews);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

router.post('/',async (req, res)=>{
    const { userId, comment, rating, foodId} = req.body;
    try {
        const newReview = await Reviews.create({
            userId,
            comment,
            rating,
            foodId
        }); 
        res.status(200).json(newReview);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

module.exports = router;