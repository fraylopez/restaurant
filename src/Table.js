class Table {
  _availableSeats;
  constructor(seats) {
    this.seats = seats;
    this._availableSeats = seats;
  }

  canAllocate(size) {
    return this._availableSeats >= size;
  }

  allocate(people) {
    this._availableSeats -= people;
  }

  free(seats) {
    this._availableSeats += seats;
  }
}

module.exports = Table;
