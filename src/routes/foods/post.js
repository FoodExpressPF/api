const router = require("express").Router();
const { StatusCodes } = require("http-status-codes");
const postFood = require("../controllers/postFood.js");

router.post("/", async (req, res) => {
  const { type_user } = req.body;
  const foodInfo = req.body;

  try {
    if(type_user !== "admin") throw {
      status: StatusCodes.UNAUTHORIZED,
      reason: "Function only enabled for administrators",
    }

    await postFood(foodInfo);

    return res
      .status(StatusCodes.CREATED)
      .send({message: "Food succesfully created!"})
    ;
  } catch (error) {
    return res
      .status(error.status || StatusCodes.BAD_REQUEST)
      .send(error.reason || error)
    ;
  }
});

module.exports = router;