const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/", (req, res) => {
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