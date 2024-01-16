const User = require('./ex_user');
const Wine = require('./wine');
const Category = require('./category');
const Review = require('./review');

// Define associations

User.hasMany(Review, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });

Review.belongsTo(User, {
    foreignKey: "user_id",
  });

Wine.hasMany(Review, {
    foreignKey: "wine_id",
    onDelete: "CASCADE",
  });

Review.belongsTo(Wine, {
    foreignKey: "wine_id",
  });

Category.hasMany(Wine, {
    foreignKey: "category_id",
    onDelete: "CASCADE",
  });

Wine.belongsTo(Category, {
    foreignKey: "category_id",
  });

module.exports = { User, Wine, Review, Category };
