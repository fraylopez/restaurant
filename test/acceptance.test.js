const { expect } = require("chai");
const Restaurant = require("../src/Restaurant");
const Table = require("../src/Table");
const CustomerGroup = require("../src/CustomerGroup");

describe("Restaurant acceptance tests", () => {
  describe("Feature: Allocate an arriving group", () => {
    let restaurant;
    let group;
    let table;
    it("Given a Restaurant with a table with 2 free seats", async () => {
      table = new Table(2);
      restaurant = new Restaurant([table]);
    });
    it("And a group of 2 people", async () => {
      group = new CustomerGroup(2);
    });
    it("When the group arrives and request table", async () => {
      restaurant.arrives(group);
    });
    it("Then the group should be allocated on that table", () => {
      const locatedTable = restaurant.locate(group);
      expect(locatedTable).equal(table);
    });
  });

  describe("Feature: A group arrives without free tables and waits", () => {
    let restaurant;
    let group;
    let table;
    it("Given a Restaurant with a table with 2 free seats", async () => {
      table = new Table(2);
      restaurant = new Restaurant([table]);
    });
    it("And a group of 4 people", async () => {
      group = new CustomerGroup(4);
    });
    it("When the group arrives and request table", async () => {
      restaurant.arrives(group);
    });
    it("Then the group should not be allocated on that table", () => {
      const locatedTable = restaurant.locate(group);
      expect(locatedTable).equal(null);
    });
  });

  describe("Feature: Allocate a waiting group", () => {
    let restaurant;
    let table;
    let group2;
    let group1;
    it("Given a Restaurant with a table with 4 free seats", async () => {
      table = new Table(4);
      restaurant = new Restaurant([table]);
    });
    it("And a group of 4 people", async () => {
      group1 = new CustomerGroup(4);
    });
    it("When the group arrives and request table", async () => {
      restaurant.arrives(group1);
    });

    it("And another group with more people than available requests a table", async () => {
      group2 = new CustomerGroup(3);
      restaurant.arrives(group2);
    });

    it("When first group leaves", async () => {
      await restaurant.leave(group1);
    });

    it("Then the second group should have been allocated", async () => {
      const locatedTable = restaurant.locate(group2);
      expect(locatedTable).equal(table);
    });
  });
});
