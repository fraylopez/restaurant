class CustomerGroup {
  table = null;
  constructor(size) {
    this.size = size;
  }
  allocate(table) {
    this.table = table;
  }
  leave() {
    this.table?.free(this);
  }
}

module.exports = CustomerGroup;
