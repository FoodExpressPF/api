const router = require("express").Router();

const foodsRoute = require("./foods/index.js");
const userRoute = require("./user/index.js");
const favoritesRoute = require("./favorites/index.js");
const sendEmailRoute = require("./send-email/index.js");

const PaymentController = require("../controllers/PaymentController");
const PaymentService = require("../utils/PaymentService");
const PaymentInstance = new PaymentController(new PaymentService());

const createPayment = require("../controllers/paypal.js");

router.use("/foods", foodsRoute);
router.use("/user", userRoute);
router.use("/favorites", favoritesRoute);
router.use("/send-email", sendEmailRoute)

router.post(`/paypal`, createPayment);

router.post("/payment", function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res); //recibir items del front, al controller y finalmente al utils
});

module.exports = router;