class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
  }

  delete(fn) {
    let current = this.head;
    let previous = null;
    while (current) {
      if (fn(current.value)) {
        if (previous) {
          previous.next = current.next;
        } else {
          this.head = current.next;
        }
        if (!current.next) {
          this.tail = previous;
        }
        return current.value;
      }
      previous = current;
      current = current.next;
    }
    return null;
  }

  get(fn) {
    let current = this.head;
    while (current) {
      if (fn(current.value)) {
        return current;
      }
      current = current.next;
    }
    return null;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

module.exports = LinkedList;
