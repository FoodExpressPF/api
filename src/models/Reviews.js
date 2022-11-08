const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("review", {
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
