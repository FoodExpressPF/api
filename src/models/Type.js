const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("type", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

/*module.exports = (sequelize) => {
  sequelize.define("type", {
    name: {
      type: DataTypes.ENUM(
        "Gluten Free",
        "Vegetarian",
        "Vegan",
        "Potrein",
        "Others"
      ),
      allowNull: false,
    },
  });
};
*/
