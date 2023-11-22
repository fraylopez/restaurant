const Restaurant = require("../src/Restaurant");
const Table = require("../src/Table");
const expect = require("chai").expect;
const CustomerGroup = require("../src/CustomerGroup");

describe("Restaurant", () => {
  it("should create a restaurant with tables", () => {
    const restaurant = new Restaurant([new Table(2)]);
  });

  it("should put a group to wait when no available tables", () => {
    const restaurant = new Restaurant([]);
    const group = new CustomerGroup(2);
    restaurant.arrives(group);
    expect(restaurant.locate(group)).equal(null);
  });

  it("should allocate an arriving group when available tables", () => {
    const table = new Table(2);
    const restaurant = new Restaurant([table]);
    const group = new CustomerGroup(2);
    restaurant.arrives(group);
    expect(restaurant.locate(group)).equal(table);
  });

  it("should put a group to wait when not enough free seats on the same table", () => {
    const table = new Table(2);
    const restaurant = new Restaurant([table]);
    const group = new CustomerGroup(3);
    restaurant.arrives(group);
    expect(restaurant.locate(group)).equal(null);
  });

  it("should allocate a waiting group when enough free seats are freed", () => {
    const table = new Table(2);
    const restaurant = new Restaurant([table]);
    const group1 = new CustomerGroup(2);
    const group2 = new CustomerGroup(2);
    restaurant.arrives(group1);
    restaurant.arrives(group2);
    restaurant.leave(group1);
    expect(restaurant.locate(group2)).equal(table);
  });

  it("should not allocate a waiting group when NOT enough free seats are freed", () => {
    const table = new Table(2);
    const restaurant = new Restaurant([table]);
    const group1 = new CustomerGroup(2);
    const group2 = new CustomerGroup(3);
    restaurant.arrives(group1);
    restaurant.arrives(group2);
    restaurant.leave(group1);
    expect(restaurant.locate(group2)).equal(null);
  });

  it("should allow a waiting group to leave", () => {
    const restaurant = new Restaurant([]);
    const group1 = new CustomerGroup(2);
    restaurant.arrives(group1);
    restaurant.leave(group1);
    expect(restaurant.locate(group1)).equal(null);
  });

  it("should prioritize the waiting group on arrival order", () => {
    const table = new Table(2);
    const restaurant = new Restaurant([table]);
    const group1 = new CustomerGroup(2);
    const group2 = new CustomerGroup(2);
    const group3 = new CustomerGroup(2);
    restaurant.arrives(group1);
    restaurant.arrives(group2);
    restaurant.arrives(group3);
    restaurant.leave(group1);
    expect(restaurant.locate(group2)).equal(table);
  });
});
