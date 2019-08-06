class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  insertBefore(item, key) {
    let tempNode = this.head;
    if (this.head === null) {
      this.insertFirst(item);
    } else if (tempNode.value === key) {
      this.head = new _Node(item, this.head);
    } else {
      while (tempNode.next !== null && tempNode.next.value !== key) {
        tempNode = tempNode.next;
      }
      let newNode = new _Node(item, tempNode.next);
      tempNode.next = newNode;
    }
  }

  insertAfter(item, key) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.value !== key) {
        tempNode = tempNode.next;
      }
      let newNode = new _Node(item, tempNode.next);
      tempNode.next = newNode;
    }
  }

  insertAt(item, position) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }

    if (position === 0) {
      this.insertFirst(item);
    } else {
      for (let i = 0; i < position - 1; i++) {
        if (currNode.next === null) {
          currNode.next = new _Node(item, null);
          return;
        }
        currNode = currNode.next;
      }

      let newNode = new _Node(item, currNode.next);
      currNode.next = newNode;
    }
  }

  find(item) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }

    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }

  remove(item) {
    if (!this.head) {
      return null;
    }
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    let currNode = this.head;
    let prevNode = this.head;

    while (currNode !== null && currNode.value !== item) {
      prevNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not Found');
      return;
    }
    prevNode.next = currNode.next;
  }

  display() {
    let currNode = this.head;
    while (currNode !== null) {
      console.log(currNode.value);
      currNode = currNode.next;
    }
  }
}

module.exports = LinkedList;
