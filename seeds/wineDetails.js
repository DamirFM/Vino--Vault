const fs = require('fs');

let wineData = [];
//ead the entire file content into a string
fs.readFile('./assets/wine_documents.jsonl', 'utf8', (err, data) => {
 if (err) throw err;

 // splits string into lines, and each line is parsed into a JSON object and pushed into the wineData array
 const lines = data.split('\n');

 lines.forEach(line => {
 if (!line) return; 
 const wine = JSON.parse(line);
 wineData.push({
  name: wine.name,
  variety: wine.variety,
  year: wine.year,
  region: wine.region,
  country: wine.country,
  price: wine.price,
  imageUrl: wine.imageUrl,
  rating: wine.rating,
  createdAt: new Date(),
  updatedAt: new Date()
 });
 });
//exports the seedWines function
 const seedWines = () => Wine.bulkCreate(wineData);
 module.exports = seedWines;
});