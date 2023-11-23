const Restaurant = require("../src/Restaurant");
const { createRestaurantWithTables } = require("./restaurantBuilder");
const { createGroups } = require("./groupBuilder");

const metrics = {};
describe("Performance metrics", () => {
  const numCalls = 50000;
  let restaurant;
  let groups;

  let time;
  let memory;
  beforeEach(() => {
    restaurant = createRestaurantWithTables(numCalls, 2);
    groups = createGroups(numCalls, 2);
  });

  after(() => {
    console.table(metrics);
    console.log(["time (µs)", "memory (bytes)"]);
  });

  describe(`${Restaurant.prototype.arrives.name}`, () => {
    after(() => {
      addMetrics(Restaurant.prototype.arrives.name, time, memory, numCalls);
    });
    it("time", () => {
      time = getTime(() => groups.forEach((group) => restaurant.arrives(group)));
    });

    it("memory", () => {
      memory = getMemoryUsage(() => groups.forEach((group) => restaurant.arrives(group)));
    });
  });

  describe(`${Restaurant.prototype.leave.name}`, () => {
    beforeEach(() => {
      groups.forEach((group) => restaurant.arrives(group));
    });
    after(() => {
      addMetrics(Restaurant.prototype.leave.name, time, memory, numCalls);
    });
    it("time", () => {
      time = getTime(() => groups.forEach((group) => restaurant.leave(group.id)));
    });

    it("memory", () => {
      memory = getMemoryUsage(() => groups.forEach((group) => restaurant.leave(group.id)));
    });
  });

  describe(`${Restaurant.prototype.locate.name}`, () => {
    beforeEach(() => {
      groups.forEach((group) => restaurant.arrives(group));
    });
    after(() => {
      addMetrics(Restaurant.prototype.locate.name, time, memory, numCalls);
    });
    it("time", () => {
      time = getTime(() => groups.forEach((group) => restaurant.locate(group.id)));
    });

    it("memory", () => {
      memory = getMemoryUsage(() => groups.forEach((group) => restaurant.locate(group.id)));
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

function addMetrics(method, time, mem, numCalls) {
  metrics[method] = {
    time: (1000 * time) / numCalls,
    memory: mem / numCalls,
  };
}
