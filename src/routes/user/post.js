const router = require("express").Router();
const { User } = require('../../db');
const postUser  = require('../../controllers/postUser'); 
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

router.post("/", async(req, res)=>{
    const {name, email, direction, number_phone } = req.body;

    try {
        await postUser(email);
        const newUser = await User.create({
            name: name,
            email: email,
            direction: direction,
            number_phone: number_phone,
            type_user : 'Client'
        });
        res.status(StatusCodes.CREATED).json({created: "ok", ...newUser.dataValues});
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error});
    }
});

module.exports = router;