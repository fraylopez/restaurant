const Restaurant = require("../src/Restaurant");
const Table = require("../src/Table");

function createRestaurantWithTables(numTables, tableSize) {
  const tables = Array.from({ length: numTables }, () => new Table(tableSize));
  return new Restaurant(tables);
}
exports.createRestaurantWithTables = createRestaurantWithTables;
