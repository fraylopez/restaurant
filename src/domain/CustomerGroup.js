class CustomerGroup {
  table = null;
  constructor(id, size) {
    this.id = id;
    this.size = size;
  }
  allocate(table) {
    this.table = table;
  }
}

module.exports = CustomerGroup;
