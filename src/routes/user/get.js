const router = require("express").Router();
const { User } = require('../../db');
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

router.get("/", async(req, res)=>{
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

module.exports = router;