class RestaurantRepository1 {
  tables;
  groups;
  waitingGroups;
  constructor() {
    this.tables = [];
    this.groups = [];
    this.waitingGroups = [];
  }

  addTables(tables) {
    this.tables = tables;
  }

  addGroup(group) {
    this.groups.push(group);
  }

  addWaitingGroup(group) {
    this.waitingGroups.push(group);
  }

  findGroup(groupId) {
    return this.groups.find((g) => g.id === groupId);
  }

  removeGroup(groupId) {
    this.groups = this.groups.filter((g) => g.id !== groupId);
  }

  findFreeTable(groupSize) {
    return this.tables.find((table) => table.canAllocate(groupSize));
  }

  findNextWaitingGroup(freeSeats) {
    // find and remove the first group that fits
    const group = this.waitingGroups.find((g) => g.size <= freeSeats);
    if (group) {
      this.waitingGroups = this.waitingGroups.filter((g) => g.id !== group.id);
    }
    return group;
  }
}

module.exports = RestaurantRepository1;
