class RestaurantRepository {
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
    this.waitingGroups.push(group);
  }

  findGroup(groupId) {
    return this.groups.get(groupId);
  }

  removeGroup(groupId) {
    this.groups.delete(groupId);
    this._fastRemoveFromArr(this.waitingGroups, (g) => g.id === groupId);
  }

  findFreeTable(groupSize) {
    return this.tables.find((table) => table.canAllocate(groupSize));
  }

  findNextWaitingGroup(freeSeats) {
    return this._fastRemoveFromArr(this.waitingGroups, (g) => g.size <= freeSeats);
  }

  _fastRemoveFromArr(arr, matchFn) {
    const i = arr.findIndex(matchFn);
    const item = i > -1 ? arr[i] : null;
    if (i > -1) {
      arr[i] = arr[arr.length - 1];
      arr.pop();
    }
    return item;
  }
}

module.exports = RestaurantRepository;
