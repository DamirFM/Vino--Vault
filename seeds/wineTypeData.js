const WineType = require('../models/wineType');

const wineTypeData = [
 {
   name: 'Red',
   createdAt:  Date(),
   updatedAt:  Date()
 },
 {
   name: 'White',
   createdAt:  Date(),
   updatedAt:  Date()
 },
 {
   name: 'Sparkling',
   createdAt: Date(),
   updatedAt: Date()
 },
 
];

const seedWineTypes = () => WineType.bulkCreate(wineTypeData);

module.exports = seedWineTypes;