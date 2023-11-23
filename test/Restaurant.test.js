const Restaurant = require("../src/Restaurant");
const Table = require("../src/domain/Table");
const expect = require("chai").expect;
const { createRestaurantWithTables, createEmptyRestaurant } = require("./restaurantBuilder");
const { createSingleGroup, createGroups } = require("./groupBuilder");

describe("Restaurant", () => {
  it("should create a restaurant with tables", () => {
    createRestaurantWithTables(1, 2);
  });

  it("should put a group to wait when no available tables", () => {
    const restaurant = createEmptyRestaurant();
    const group = createSingleGroup(2);
    restaurant.arrives(group);
    expect(restaurant.locate(group.id)).equal(null);
  });

  it("should allocate an arriving group when available tables", () => {
    const restaurant = createRestaurantWithTables(1, 2);
    const group = createSingleGroup(2);
    restaurant.arrives(group);
    expect(restaurant.locate(group.id)).instanceOf(Table);
  });

  it("should put a group to wait when not enough free seats on the same table", () => {
    const restaurant = createRestaurantWithTables(1, 2);
    const group = createSingleGroup(3);
    restaurant.arrives(group);
    expect(restaurant.locate(group)).equal(null);
  });

  it("should allocate a waiting group when enough free seats are freed", () => {
    const restaurant = createRestaurantWithTables(1, 2);
    const group1 = createSingleGroup(2);
    const group2 = createSingleGroup(2);
    restaurant.arrives(group1);
    restaurant.arrives(group2);
    restaurant.leave(group1.id);
    expect(restaurant.locate(group2.id)).instanceOf(Table);
  });

  it("should allocate a bigger waiting group when enough free seats are freed", () => {
    const restaurant = createRestaurantWithTables(1, 3);
    const group1 = createSingleGroup(2);
    const group2 = createSingleGroup(3);
    restaurant.arrives(group1);
    restaurant.arrives(group2);
    restaurant.leave(group1.id);
    expect(restaurant.locate(group2.id)).instanceOf(Table);
  });

  it("should not allocate a waiting group when NOT enough free seats are freed", () => {
    const restaurant = createRestaurantWithTables(1, 2);
    const group1 = createSingleGroup(2);
    const group2 = createSingleGroup(3);
    restaurant.arrives(group1);
    restaurant.arrives(group2);
    restaurant.leave(group1.id);
    expect(restaurant.locate(group2.id)).equal(null);
  });

  it("should allow a waiting group to leave", () => {
    const restaurant = createEmptyRestaurant();
    const group1 = createSingleGroup(2);
    restaurant.arrives(group1);
    restaurant.leave(group1.id);
    expect(restaurant.locate(group1.id)).equal(null);
  });

  it("should prioritize the waiting group on arrival order", () => {
    const restaurant = createRestaurantWithTables(1, 2);
    const [group1, group2, group3] = createGroups(3, 2);
    restaurant.arrives(group1);
    restaurant.arrives(group2);
    restaurant.arrives(group3);
    restaurant.leave(group1.id);
    expect(restaurant.locate(group2.id)).instanceOf(Table);
  });
});
