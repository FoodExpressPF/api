const router = require("express").Router();

const foodsRoute = require("./foods/index.js");
const userRoute = require("./user/index.js");
const favoritesRoute = require("./favorites/index.js");
const sendEmailRoute = require("./send-email/index.js");
const paymentsRoute = require("./payments/index.js");

router.use("/foods", foodsRoute);
router.use("/user", userRoute);
router.use("/favorites", favoritesRoute);
router.use("/send-email", sendEmailRoute)
router.use("/payments", paymentsRoute);



const PaymentController = require("../controllers/payments/mercadoPago/PaymentController");
const PaymentService = require("../controllers/payments/mercadoPago/PaymentService");
const PaymentInstance = new PaymentController(new PaymentService());

const createPayment = require("../controllers/payments/paypal/paypal.js");

router.post(`/paypal`, createPayment);

router.post("/payments", function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res); //recibir items del front, al controller y finalmente al utils
});

module.exports = router;