const axios = require("axios");

class PaymentService {
  async createPayment(total) {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      payer_email: "test_user_46945293@testuser.com",

      items: [
        {
          title: "total",
          description: "de aca pa google",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: total,
        },
      ],
      back_urls: {
        failure: "http://localhost:3000/denegated",
        pending: "/pending",
        success: "http://localhost:3000/passed",
      },
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    return payment.data;
  }
}

module.exports = PaymentService;
