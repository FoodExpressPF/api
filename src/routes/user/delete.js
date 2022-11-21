const router = require("express").Router();
const { User } = require('../../db');
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

//este metodo lo uso para borrar duplicados hasta que funcionen las restricciones
router.delete("/", async(req, res)=>{
    const {id} = req.query;
    try {
        const deleteUsers = User.destroy({where: {id: id}});
        res.status(200).json({Delete: "Ok", ...deleteUsers});
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

module.exports = router;