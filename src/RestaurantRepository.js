class RestaurantRepository {
  tables;
  groups;
  waitingGroups;
  constructor() {
    this.tables = new Set();
    this.groups = new Map();
    this.waitingGroups = [];
  }

  addTables(tables) {
    tables.forEach((element) => {
      this.tables.add(element);
    });
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

  removeGroup(group) {
    this.groups.delete(group);
    this.waitingGroups = this.waitingGroups.filter((g) => g !== group);
  }

  findFreeTable(group) {
    for (const table of this.tables) {
      if (table.canAllocate(group.size)) {
        return table;
      }
    }
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
