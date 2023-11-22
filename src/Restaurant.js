class Restaurant {
  tables = [];
  groups = [];
  constructor(tables) {
    this.tables = tables;
  }

  arrives(group) {
    const table = this._findFreeTable(group);
    group.table = table;
    this.groups.push(group);
  }

  leave(group) {
    group.table = null;
    this.groups = this.groups.filter((g) => g !== group);
  }

  locate(group) {
    return this.groups.find((g) => g === group)?.table || null;
  }

  _findFreeTable(group) {
    return this.tables.find((table) => table.canAllocate(group.size));
  }
}

module.exports = Restaurant;
