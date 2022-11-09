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
      offer: food.offer,
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
      offer: el.offer,
    };
  });
  const allInf = apiInf.concat(dbInf);
  return allInf;
};

const filterRating = (foods, order) => {
  const filtered = foods.sort((first, second) => {
    if (parseFloat(first.rating) > parseFloat(second.rating)) {
      return 1;
    }
    if (parseFloat(second.rating) > parseFloat(first.rating)) {
      return -1;
    }
    return 0;
  });
  return order === "lowest rating" ? filtered : filtered.reverse();
};
const filterPrice = async (foods, order) => {
  const filtered = foods.sort((first, second) => {
    if (parseInt(first.price) > parseInt(second.price)) {
      return 1;
    }
    if (parseInt(second.price) > parseInt(first.price)) {
      return -1;
    }
    return 0;
  });

  return order === "lower price" ? filtered : filtered.reverse();
};
const filterOffer = (foods, order) => {
  if (order == "true") {
    const filtered = foods.filter((food) => food.offer == true);
    if (filtered.length !== 0) {
      return filtered;
    }
  } else {
    const filtered = foods.filter((food) => food.offer == false);
    if (filtered.length !== 0) {
      return filtered;
    }
  }
};
const filterAlphabetical = (foods, order) => {
  const alphabetical = foods.sort((first, second) => {
    if (first.name.toUpperCase() > second.name.toUpperCase()) {
      return 1;
    }
    if (second.name.toUpperCase() > first.name.toUpperCase()) {
      return -1;
    }
    return 0;
  });

  if (order === "A-Z") return alphabetical;
  else return alphabetical.reverse();
};

const filterType = (foods, order) => {
  const filtered = foods.filter((food) => food.type.includes(order));
  return filtered;
};

module.exports = {
  getAll,
  getApi,
  getDb,
  filterRating,
  filterPrice,
  filterOffer,
  filterAlphabetical,
  filterType,
};
