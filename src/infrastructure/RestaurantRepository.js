const LinkedList = require("./LinkedList");

class RestaurantRepository {
  tables;
  groups;
  waitingGroups;
  constructor() {
    this.tables = [];
    this.groups = new Map();
    this.waitingGroups = new LinkedList();
  }

  addTables(tables) {
    this.tables = tables;
  }

  addGroup(group) {
    this.groups.set(group.id, group);
  }

  addWaitingGroup(group) {
    this.waitingGroups.add(group);
  }

  findGroup(groupId) {
    return this.groups.get(groupId);
  }

  removeGroup(groupId) {
    this.groups.delete(groupId);
    this.waitingGroups.delete((g) => g.id === groupId);
  }

  findFreeTable(groupSize) {
    return this.tables.find((table) => table.canAllocate(groupSize));
  }

  findNextWaitingGroup(freeSeats) {
    return this.waitingGroups.delete((g) => g.size <= freeSeats);
  }
}

module.exports = RestaurantRepository;
