class RestaurantRepository2 {
  tables;
  groups;
  waitingGroups;
  constructor() {
    this.tables = [];
    this.groups = new Map();
    this.waitingGroups = [];
  }

  addTables(tables) {
    this.tables = tables;
  }

  addGroup(group) {
    this.groups.set(group.id, group);
  }

  addWaitingGroup(group) {
    // add to the end of the queue to keep the arrival order
    this.waitingGroups.push(group);
  }

  findGroup(groupId) {
    return this.groups.get(groupId);
  }

  removeGroup(groupId) {
    this.groups.delete(groupId);
    this.waitingGroups = this.waitingGroups.filter((g) => g.id !== groupId);
  }

  findFreeTable(groupSize) {
    return this.tables.find((table) => table.canAllocate(groupSize));
  }

  findNextWaitingGroup(freeSeats) {
    // find and remove the first group that fits
    const group = this.waitingGroups.find((g) => g.size <= freeSeats);
    if (group) {
      this.removeGroup(group);
    }
    return group;
  }
}

module.exports = RestaurantRepository2;
