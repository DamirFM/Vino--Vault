const sequelize = require('../config/connection');
const { User, Wine, Review, Category } = require('../models');

const userData = require('./userData.json');
const wineData = require('./wineData.json');
const reviewData = require('./reviewData.json');
const categoryData = require('./categoryData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    const categories = await Category.bulkCreate(categoryData);

    const wines = await Wine.bulkCreate(wineData.map(wine => ({
      ...wine,
      category_id: categories[Math.floor(Math.random() * categories.length)].id,
    })));

    const reviews = await Review.bulkCreate(reviewData.map(review => ({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      wine_id: wines[Math.floor(Math.random() * wines.length)].id,
    })));

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();

