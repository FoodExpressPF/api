const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("reviews", {
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
