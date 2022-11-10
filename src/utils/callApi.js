// This function temporally calls the Firebase API that
// we created to the frontend team can develop when we're
// making the backend.

const axios = require("axios");
const { StatusCodes } = require('http-status-codes');
const API_PATH = "https://foods-98ee3-default-rtdb.firebaseio.com/Foods.json";

const foodModelParser = ( food ) => {
  return {
    id: food.id,
    name: food.name,
    price: food.price,
    description: food.description,
    rating: food.rating,
    image: food.url,
    type: food.type,
    reviews: food.reviews,
    offer: food.offer,
  };
}

const callApi = () => 
  axios.get(API_PATH)
    .then(res => res.data)
    .then(data => data.map(foodModelParser))
    .catch(error => { throw {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: `Error at calling the external api: ${error}`,
}});

module.exports = callApi;