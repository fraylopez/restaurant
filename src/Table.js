class Table {
  _availableSeats;
  constructor(seats) {
    this.seats = seats;
    this._availableSeats = seats;
  }

  canAllocate(size) {
    return this._availableSeats >= size;
  }

  allocate(group) {
    this._availableSeats -= group.size;
    group.allocate(this);
  }

  free(group) {
    this._availableSeats += group.size;
  }
}

module.exports = Table;
