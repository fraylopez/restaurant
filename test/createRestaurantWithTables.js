const Restaurant = require("../src/Restaurant");
const Table = require("../src/domain/Table");

function createRestaurantWithTables(numTables, tableSize) {
  const tables = Array.from({ length: numTables }, () => new Table(tableSize));
  return new Restaurant(tables);
}
exports.createRestaurantWithTables = createRestaurantWithTables;
