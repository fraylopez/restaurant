const Restaurant = require("../src/Restaurant");
const Table = require("../src/domain/Table");

function createRestaurantWithTables(numTables, tableSize) {
  const tables = Array.from({ length: numTables }, () => new Table(tableSize));
  return new Restaurant(tables);
}

function createEmptyRestaurant() {
  return new Restaurant([]);
}
exports.createRestaurantWithTables = createRestaurantWithTables;
exports.createEmptyRestaurant = createEmptyRestaurant;
