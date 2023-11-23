const Restaurant = require("../src/Restaurant");
const { createRestaurantWithTables } = require("./restaurantBuilder");
const { createGroups } = require("./groupBuilder");

describe("Performance metrics", () => {
  const numCalls = 50000;
  let restaurant;
  let groups;
  beforeEach(() => {
    restaurant = createRestaurantWithTables(numCalls, 2);
    groups = createGroups(numCalls, 2);
  });
  describe(`${Restaurant.prototype.arrives.name}`, () => {
    it("time", () => {
      const elapsed = getTime(() => groups.forEach((group) => restaurant.arrives(group)));
      console.log(`${Restaurant.prototype.arrives.name} took ${elapsed / numCalls} ms`);
    });

    it("memory", () => {
      const mem = getMemoryUsage(() => groups.forEach((group) => restaurant.arrives(group)));
      console.log(`${Restaurant.prototype.arrives.name} took ${mem / numCalls} bytes`);
    });
  });

  describe(`${Restaurant.prototype.leave.name}`, () => {
    beforeEach(() => {
      groups.forEach((group) => restaurant.arrives(group));
    });
    it("time", () => {
      const elapsed = getTime(() => groups.forEach((group) => restaurant.leave(group.id)));
      console.log(`${Restaurant.prototype.leave.name} took ${elapsed / numCalls} ms`);
    });

    it("memory", () => {
      const mem = getMemoryUsage(() => groups.forEach((group) => restaurant.leave(group.id)));
      console.log(`${Restaurant.prototype.leave.name} took ${mem / numCalls} bytes`);
    });
  });

  describe(`${Restaurant.prototype.locate.name}`, () => {
    beforeEach(() => {
      groups.forEach((group) => restaurant.arrives(group));
    });
    it("time", () => {
      const elapsed = getTime(() => groups.forEach((group) => restaurant.locate(group.id)));
      console.log(`${Restaurant.prototype.locate.name} took ${elapsed / numCalls} ms`);
    });

    it("memory", () => {
      const mem = getMemoryUsage(() => groups.forEach((group) => restaurant.locate(group.id)));
      console.log(`${Restaurant.prototype.locate.name} took ${mem / numCalls} bytes`);
    });
  });
});

function getMemoryUsage(fn) {
  const start = process.memoryUsage().heapUsed;
  fn();
  const end = process.memoryUsage().heapUsed;
  return end - start;
}
function getTime(fn) {
  const start = Date.now();
  fn();
  const end = Date.now();
  return end - start;
}
