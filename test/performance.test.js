const { expect } = require("chai");
const { createRestaurantWithTables } = require("./restaurantBuilder");
const { createGroups } = require("./groupBuilder");

describe("Performance tests", () => {
  [
    { numGroups: 10, groupSize: 2 },
    { numGroups: 100, groupSize: 2 },
    { numGroups: 1000, groupSize: 2 },
    { numGroups: 10000, groupSize: 2 },
    { numGroups: 100000, groupSize: 2 },
  ].forEach((testCase) => {
    describe(`Direct allocation`, () => {
      describe(`${testCase.numGroups} groups`, () => {
        let restaurant;
        let groups;
        it(`Given a restaurant with ${testCase.numGroups} tables with ${testCase.groupSize} seats each`, () => {
          restaurant = createRestaurantWithTables(testCase.numGroups, testCase.groupSize);
        });
        it(`And ${testCase.numGroups} groups of ${testCase.groupSize}`, () => {
          groups = createGroups(testCase.numGroups, testCase.groupSize);
        });
        it(`When all groups arrive and request tables`, () => {
          groups.forEach((group) => restaurant.arrives(group));
        });
        it(`Then all groups should be allocated on a table`, () => {
          groups.forEach((group) => {
            const locatedTable = restaurant.locate(group.id);
            expect(locatedTable).not.equal(null);
          });
        });
      });
    });

    describe(`Allocate waiting groups on freed tables`, () => {
      describe(`${testCase.numGroups} groups`, () => {
        let restaurant;
        let groups;
        let waitingGroups;
        it(`Given a restaurant with ${testCase.numGroups} table with ${testCase.groupSize} seats`, () => {
          restaurant = createRestaurantWithTables(testCase.numGroups, testCase.groupSize + 1);
        });
        it(`And ${testCase.numGroups} groups of ${testCase.groupSize} people allocated`, () => {
          groups = createGroups(testCase.numGroups, testCase.groupSize);
          groups.forEach((group) => restaurant.arrives(group));
        });
        it(`And ${testCase.numGroups} waiting groups of ${testCase.groupSize + 1} people`, () => {
          waitingGroups = createGroups(testCase.numGroups, testCase.groupSize);
        });

        it(`When all waiting groups arrive and request tables`, () => {
          waitingGroups.forEach((group) => restaurant.arrives(group));
        });
        it(`Then waiting groups should be allocated on a table as soon as it gets freed `, () => {
          groups.forEach((group) => {
            restaurant.leave(group.id);
          });
          waitingGroups.forEach((group) => {
            const locatedTable = restaurant.locate(group.id);
            expect(locatedTable).not.equal(null);
          });
        });
      });
    });
  });
});
