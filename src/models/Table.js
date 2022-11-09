const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("table", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(["available", "taken" , "reserved"]),
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      validate: { min: 1 },
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
};