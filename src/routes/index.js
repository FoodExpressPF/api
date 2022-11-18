const router = require("express").Router();

const getFoods = require("./foods/get.js");
const postFoods = require("./foods/post.js");
const postUser = require("./user/post.js");
const getUser = require("./user/get.js");
const deleteUser = require("./user/delete.js");
const updateUser = require("./user/update.js");
const getFavorites = require("./favorites/get.js");
const putFavorites = require("./favorites/put.js");
const deleteFavorites = require("./favorites/delete.js");

const PaymentController = require("../controllers/PaymentController");
const PaymentService = require("../utils/PaymentService");
const PaymentInstance = new PaymentController(new PaymentService());

const nodemailer = require("nodemailer");

const createPayment = require("../controllers/paypal.js");

router.use("/foods", getFoods);
router.use("/foods/create", postFoods);
router.use("/user/create", postUser);
router.use("/user/delete", deleteUser);
router.use("/user", getUser);
router.use("/user/update", updateUser);
router.use("/favorites/get", getFavorites);
router.use("/favorites/put", putFavorites);
router.use("/favorites/delete", deleteFavorites);

router.post(`/paypal`, createPayment);

router.post("/payment", function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res); //recibir items del front, al controller y finalmente al utils
});

router.post("/send-email", (req, res) => {
  const { user, subject, text } = req.body;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 587,
    auth: {
      user: "cheshiree72@gmail.com",
      pass: "ioixgkmvtgpqvkko",
    },
  }); //por req debera llegar  un objeto con user.email e info del mensaje
  let mailOptions = {
    from: "Remitente",
    to: user,
    subject: subject,
    text: text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log("enviado");
      res.status(200).json(req.body);
    }
  });
});

module.exports = router;
