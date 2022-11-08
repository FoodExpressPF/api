const axios = require("axios");
const { Foods } = require("../db");

const getApi = async () => {
  const api = await axios.get(
    "https://foods-98ee3-default-rtdb.firebaseio.com/Foods.json"
  );
  const inf = await api.data.map((food) => {
    return {
      id: food.id,
      name: food.name,
      price: food.price,
      description: food.description,
      rating: food.rating,
      image: food.url,
      type: food.type,
      reviews: food.reviews,
    };
  });
  return await inf;
};
const getDb = async () => {
  return await Foods.findAll();
};
const getAll = async () => {
  const apiInf = await getApi();
  let dbInf = await getDb();
  dbInf = await dbInf.map((el) => {
    return {
      id: el.id,
      name: el.name,
      price: el.price,
      description: el.description,
      rating: el.rating,
      image: el.url,
      type: el.type,
    };
  });
  const allInf = apiInf.concat(dbInf);
  return allInf;
};

module.exports = {
  getAll,
  getApi,
  getDb,
};
