class RestaurantRepository {
  tables = [];
  groups = [];
  waitingGroups = [];
  constructor() {}

  addTables(tables) {
    this.tables = tables;
  }

  addGroup(group) {
    this.groups.push(group);
  }

  addWaitingGroup(group) {
    this.waitingGroups.push(group);
  }

  findGroup(group) {
    return this.waitingGroups.find((g) => g === group) || this.groups.find((g) => g === group);
  }

  removeGroup(group) {
    this.groups = this.groups.filter((g) => g !== group);
    this.waitingGroups = this.waitingGroups.filter((g) => g !== group);
  }

  findFreeTable(group) {
    return this.tables.find((table) => table.canAllocate(group.size));
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

module.exports = RestaurantRepository;
