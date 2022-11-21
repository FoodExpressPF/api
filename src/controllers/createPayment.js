const axios = require("axios");
const { API_MERCADO, CLIENT_URL } = require("../utils/envs.js");

const createPayment = async ( data ) => {
  try {
    const body = {
      payer_email: "test_user_46945293@testuser.com",
      items: [
        {
          title: "total",
          description: "de aca pa google",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: data,
        },
      ],
      back_urls: {
        failure: `${CLIENT_URL}/denegated`,
        pending: "/pending",
        success: `${CLIENT_URL}/passed`,
      },
    };

    const payment = await axios.post(API_MERCADO, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    return payment.data;
  } catch (error) {
    throw {
      status: error.status || StatusCodes.BAD_REQUEST,
      reason: error.reason || error,
    }  
  }
};

module.exports = createPayment;