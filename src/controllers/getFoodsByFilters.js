const { StatusCodes } = require('http-status-codes');
const { Foods } = require("../db");
const callApi = require("../utils/callApi.js");

const getAllFoods = async () => {
  // temporal function
  try{
    const foodApi = await callApi();
    const foodDb = await Foods.findAll();
    const allFoods = [...foodDb, ...foodApi];
    return allFoods;
  } catch (error) {
    throw {
      status: error.status || StatusCodes.BAD_REQUEST,
      reason: error.reason || error,
    }
  }
}

const getFoodsByFilters = async ({
  id,
  name,
  type,
  offer,
  sortby,
  asc,
}) => {
  
  try {
    const allFoods = await getAllFoods();
    //const allFoods = await Foods.findAll();
    let filteredFoods = [...allFoods];
    if(!!id) {
      const foundFood = allFoods.find(food => food.id === parseInt(id));
      return [foundFood];
    }
    
    if(!!name) filteredFoods = filteredFoods.filter(food => {
      const foodName = food.name.toUpperCase();
      return foodName.includes(name.toUpperCase());
    });

    if(!!type) filteredFoods = filteredFoods.filter(food => {
      return food.type.includes(type);
    });
    
    switch (offer) {
      case "yes":
        filteredFoods = filteredFoods.filter(food => food.offer);
        break;
      case "no":
        filteredFoods = filteredFoods.filter(food => !food.offer);
      // case default: all
    }

    switch (sortby) {
      case "price":
        filteredFoods = filteredFoods.sort(
          a.price - b.price
        ); break;
      case "rating":
        filteredFoods = filteredFoods.sort((a,b) =>
          a.rating - b.rating
        ); break;
      default:   // name
        filteredFoods = filteredFoods.sort((a,b) => 
          a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
        );
    }
    
    if(!asc) filteredFoods = filteredFoods.reverse();

    return filteredFoods;

  } catch (error) {
    throw {
      status: error.status || StatusCodes.BAD_REQUEST,
      reason: error.reason || error,
    }
  }
}

module.exports = getFoodsByFilters;