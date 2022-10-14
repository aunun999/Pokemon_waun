'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favourite.belongsTo(models.User, {foreignKey: "UserId"})
    }
  }
  Favourite.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "UserId is required"
        },
        notNull: {
          args: true,
          msg: "UserId is required"
        }
      }
    },
    pokeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "pokeId is required"
        },
        notNull: {
          args: true,
          msg: "pokeId is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};