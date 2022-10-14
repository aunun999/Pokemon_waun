'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favourite, {foreignKey: "UserId"})
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "name is required"
        },
        notEmpty: {
          args: true,
          msg : "name is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "This email is used"
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email format"
        },
        notNull: {
          args: true,
          msg: "email is required"
        },
        notEmpty: {
          args: true,
          msg : "email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "password is required"
        },
        notEmpty: {
          args: true,
          msg : "password is required"
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPass(user.password)
      }
    },
    modelName: 'User',
  });
  return User;
};