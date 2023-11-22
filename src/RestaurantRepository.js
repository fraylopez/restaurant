class RestaurantRepository {
  tables = [];
  groups = [];
  constructor() {}

  addTables(tables) {
    this.tables = tables;
  }

  addGroup(group) {
    this.groups.push(group);
  }

  findGroup(group) {
    return this.groups.find((g) => g === group);
  }

  removeGroup(group) {
    this.groups = this.groups.filter((g) => g !== group);
  }

  findFreeTable(group) {
    return this.tables.find((table) => table.canAllocate(group.size));
  }

  findWaitingGroup(size) {
    return this.groups.find((group) => group.size <= size);
  }
}

module.exports = RestaurantRepository;
