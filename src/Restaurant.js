const RestaurantRepository = require("./RestaurantRepository");
class Restaurant {
  repository;
  constructor(tables) {
    this.repository = new RestaurantRepository();
    this.repository.addTables(tables);
  }

  arrives(group) {
    this.repository.addGroup(group);
    const table = this.repository.findFreeTable(group);
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
    this.repository.removeGroup(group);
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
