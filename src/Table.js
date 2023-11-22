class Table {
  _availableSeats;
  constructor(seats) {
    this.seats = seats;
    this._availableSeats = seats;
  }

  canAllocate(size) {
    return this._availableSeats >= size;
  }
}

module.exports = Table;
