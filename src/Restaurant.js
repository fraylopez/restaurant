class Restaurant {
  constructor(tables) {
    this.tables = tables;
  }

  arrives(group) {
    throw new Error("Not implemented");
  }

  leave(group) {
    throw new Error("Not implemented");
  }

  locate(group) {
    throw new Error("Not implemented");
  }
}

module.exports = Restaurant;
