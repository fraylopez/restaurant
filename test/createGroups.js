const CustomerGroup = require("../src/CustomerGroup");

function createGroups(numGroups, groupSize) {
  return Array.from({ length: numGroups }, () => createSingleGroup(groupSize));
}

function createSingleGroup(groupSize, id) {
  id = id || Math.random().toString(36).substring(2, 9);
  return new CustomerGroup(id, groupSize);
}

exports.createGroups = createGroups;
exports.createSingleGroup = createSingleGroup;
