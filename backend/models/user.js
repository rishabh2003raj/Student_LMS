'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.associate = (models) => {
        User.belongsToMany(models.Course, {
          through: models.Enrollment,
          foreignKey: 'userId',
          as: 'Courses'
        });
      };
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique:true },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};