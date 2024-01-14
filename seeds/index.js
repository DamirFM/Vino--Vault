const sequelize = require('../config/connection');
const seedWines = require('./wineDetails');
const seedWineTypes = require('./wineTypeData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedWines();

  await seedWineTypes();

  process.exit(0);
};

seedAll();
