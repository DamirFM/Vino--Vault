const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Wine extends Model {}

Wine.init(
 {
   id: {
     type: DataTypes.INTEGER,
     allowNull: false,
     primaryKey: true,
     autoIncrement: true,
   },
   name: {
     type: DataTypes.STRING,
     allowNull: false,
   },
   variety: {
     type: DataTypes.STRING,
     allowNull: false,
   },
   year: {
     type: DataTypes.INTEGER,
     allowNull: false,
   },
   country: {
     type: DataTypes.STRING,
     allowNull: false,
   },
   price: {
     type: DataTypes.DECIMAL(10, 2),
     allowNull: false,
   },
   imageUrl: {
     type: DataTypes.STRING,
     allowNull: false,
   },
   rating: {
     type: DataTypes.INTEGER,
     allowNull: false,
   },
 },
 {
   sequelize,
   freezeTableName: true,
   underscored: true,
   modelName: 'wine',
 }
);

module.exports = Wine;
