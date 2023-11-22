const Restaurant = require("../src/Restaurant");
const Table = require("../src/Table");
const expect = require("chai").expect;

describe("Restaurant", () => {
  it("should create a restaurant with tables", () => {
    const restaurant = new Restaurant([new Table(2)]);
    expect(restaurant.tables).lengthOf(1);
  });
});
