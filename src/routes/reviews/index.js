const router = require('express').Router();
const {Reviews} = require("../../db.js");

router.get("/", async (req, res)=>{
    try {
        const reviews = await Reviews.findAll();
        res.status(200).json({reviews});
    } catch (error) {
        res.status(404).json(error);
    }
});

router.post('/', (req, res)=>{
    const { userId, comment, rating, foodId} = res.body;
});

module.exports = router;