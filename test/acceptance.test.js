const { expect } = require("chai");
const Restaurant = require("../src/Restaurant");
const Table = require("../src/domain/Table");
const CustomerGroup = require("../src/domain/CustomerGroup");
const { createRestaurantWithTables } = require("./restaurantBuilder");
const { createSingleGroup } = require("./groupBuilder");

describe("Restaurant acceptance tests", () => {
  describe("Feature: Allocate an arriving group", () => {
    let restaurant;
    let group;
    it("Given a Restaurant with a table with 2 free seats", async () => {
      restaurant = createRestaurantWithTables(1, 2);
    });
    it("And a group of 2 people", async () => {
      group = createSingleGroup(2);
    });
    it("When the group arrives and request table", async () => {
      restaurant.arrives(group);
    });
    it("Then the group should be allocated on that table", () => {
      const locatedTable = restaurant.locate(group.id);
      expect(locatedTable).instanceOf(Table);
    });
  });

  describe("Feature: A group arrives without free tables and waits", () => {
    let restaurant;
    let group;
    it("Given a Restaurant with a table with 2 free seats", async () => {
      restaurant = createRestaurantWithTables(1, 2);
    });
    it("And a group of 4 people", async () => {
      group = createSingleGroup(4);
    });
    it("When the group arrives and request table", async () => {
      restaurant.arrives(group);
    });
    it("Then the group should not be allocated on that table", () => {
      const locatedTable = restaurant.locate(group.id);
      expect(locatedTable).equal(null);
    });
  });

  describe("Feature: Allocate a waiting group", () => {
    let restaurant;
    let group1;
    let group2;
    it("Given a Restaurant with a table with 4 free seats", async () => {
      restaurant = createRestaurantWithTables(1, 4);
    });
    it("And a group of 4 people", async () => {
      group1 = createSingleGroup(4);
    });
    it("When the group arrives and request table", async () => {
      restaurant.arrives(group1);
    });

    it("And another group with more people than available requests a table", async () => {
      group2 = createSingleGroup(3);
      restaurant.arrives(group2);
    });

    it("When first group leaves", async () => {
      await restaurant.leave(group1.id);
    });

    it("Then the second group should have been allocated", async () => {
      const locatedTable = restaurant.locate(group2.id);
      expect(locatedTable).instanceOf(Table);
    });
  });
});
