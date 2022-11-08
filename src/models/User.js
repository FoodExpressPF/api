const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number_phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    type_user: {
      type: DataTypes.ENUM("Admin", "Client"),
      allowNull: false,
    },
  });
};
