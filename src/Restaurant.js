const RestaurantRepository1 = require("./infrastructure/RestaurantRepository1");
const RestaurantRepository2 = require("./infrastructure/RestaurantRepository2");
class Restaurant {
  repository;
  constructor(tables, repository = null) {
    this.repository = repository || new RestaurantRepository2();
    this.repository.addTables(tables);
  }

  arrives(group) {
    this.repository.addGroup(group);
    this._assignTable(group);
  }

  leave(groupId) {
    const group = this.repository.findGroup(groupId);
    const freeSeats = group.table?.free(group.size);
    const waitingGroup = freeSeats ? this.repository.findNextWaitingGroup(freeSeats) : null;
    this.repository.removeGroup(groupId);
    if (waitingGroup) {
      this._assignTable(waitingGroup);
    }
  }

  locate(groupId) {
    return this.repository.findGroup(groupId)?.table || null;
  }

  _assignTable(group) {
    const table = this.repository.findFreeTable(group.size);
    if (table) {
      table.allocate(group.size);
      group.allocate(table);
    } else {
      this.repository.addWaitingGroup(group);
    }
  }
}

module.exports = Restaurant;
