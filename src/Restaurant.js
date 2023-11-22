const RestaurantRepository = require("./RestaurantRepository");
class Restaurant {
  repository;
  constructor(tables) {
    this.repository = new RestaurantRepository();
    this.repository.addTables(tables);
  }

  arrives(group) {
    const table = this.repository.findFreeTable(group);
    table?.allocate(group);
    this.repository.addGroup(group);
  }

  leave(group) {
    group.leave();
    this.repository.removeGroup(group);
    const waitingGroup = this.repository.findWaitingGroup(group.size);
    if (waitingGroup) {
      this.arrives(waitingGroup);
    }
  }

  locate(group) {
    return this.repository.findGroup(group)?.table || null;
  }
}

module.exports = Restaurant;
