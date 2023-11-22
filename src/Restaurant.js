class Restaurant {
  tables = [];
  groups = [];
  constructor(tables) {
    this.tables = tables;
  }

  arrives(group) {
    const table = this._findFreeTable(group);
    table?.allocate(group);
    this.groups.push(group);
  }

  leave(group) {
    group.leave();
    this.groups = this.groups.filter((g) => g !== group);
    const waitingGroup = this._findWaitingGroup(group.size);
    if (waitingGroup) {
      this.arrives(waitingGroup);
    }
  }

  locate(group) {
    return this.groups.find((g) => g === group)?.table || null;
  }

  _findFreeTable(group) {
    return this.tables.find((table) => table.canAllocate(group.size));
  }

  _findWaitingGroup(size) {
    return this.groups.find((group) => group.size <= size);
  }
}

module.exports = Restaurant;
