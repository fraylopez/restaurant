const RestaurantRepository1 = require("./infrastructure/RestaurantRepository1");
const RestaurantRepository2 = require("./infrastructure/RestaurantRepository2");
class Restaurant {
  repository;
  constructor(tables, repository = new RestaurantRepository2()) {
    this.repository = repository;
    this.repository.addTables(tables);
  }

  arrives(group) {
    this.repository.addGroup(group);
    const table = this.repository.findFreeTable(group.size);
    if (table) {
      table.allocate(group.size);
      group.allocate(table);
    } else {
      this.repository.addWaitingGroup(group);
    }
  }

  leave(groupId) {
    const group = this.repository.findGroup(groupId);
    group.leave();
    const freeSeats = group.table?._availableSeats;
    this.repository.removeGroup(groupId);
    const waitingGroup = freeSeats ? this.repository.findNextWaitingGroup(freeSeats) : null;
    if (waitingGroup) {
      this.arrives(waitingGroup);
    }
  }

  locate(groupId) {
    return this.repository.findGroup(groupId)?.table || null;
  }
}

module.exports = Restaurant;
