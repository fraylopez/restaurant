const CustomerGroup = require("../src/CustomerGroup");
const Restaurant = require("../src/Restaurant");
const Table = require("../src/Table");
const { expect } = require("chai");

describe("Performance tests", () => {
  [
    { numGroups: 10, groupSize: 2 },
    { numGroups: 100, groupSize: 2 },
    { numGroups: 1000, groupSize: 2 },
    { numGroups: 10000, groupSize: 2 },
    { numGroups: 100000, groupSize: 2 },
  ].forEach((testCase) => {
    describe(`Direct allocation of ${testCase.numGroups} groups`, () => {
      let restaurant;
      let groups;
      it(`Given a restaurant with ${testCase.numGroups} tables with ${testCase.groupSize} seats each`, () => {});
      it(`And ${testCase.numGroups} groups of ${testCase.groupSize}`, () => {
        const tables = Array.from(
          { length: testCase.numGroups },
          () => new Table(testCase.groupSize)
        );
        restaurant = new Restaurant(tables);
        groups = Array.from(
          { length: testCase.numGroups },
          () => new CustomerGroup(testCase.groupSize)
        );
      });
      it(`When all groups arrive and request tables`, () => {
        groups.forEach((group) => restaurant.arrives(group));
      });
      it(`Then all groups should be allocated on a table`, () => {
        groups.forEach((group) => {
          const locatedTable = restaurant.locate(group);
          expect(locatedTable).not.equal(null);
        });
      });
    });
  });
});
