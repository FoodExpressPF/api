const axios = require("axios");
const { Foods, Type } = require("../db");

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
  return await Foods.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
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
      type: el.type
        .map((typ) => {
          return typ.name;
        })
        .join(", "),
    };
  });
  const allInf = apiInf.concat(dbInf);
  return allInf;
};

const getInfTypes = async () => {
  const api = await axios.get(
    `https://foods-98ee3-default-rtdb.firebaseio.com/Foods.json`
  );
  const inf = await api.data;
  const types = inf
    .map((food) => food.types)
    .join() //unir
    .split(",") //arr
    .sort(); //ord

  await types
    .filter((t, i) => types.indexOf(t) === i)
    .forEach(
      (t) =>
        t.trim() !== "" &&
        types.findOrCreate({
          where: {
            name: t.trim(),
          },
        })
    );

  const alltypes = await types.findAll({ order: [["name"]] });
  return alltypes;
};
module.exports = {
  getAll,
  getApi,
  getDb,
  getInfTypes,
};
