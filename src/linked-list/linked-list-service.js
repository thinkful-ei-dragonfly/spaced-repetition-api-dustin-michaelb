const LinkedList = require('./linked-list')

const LinkedListService = {
  linkedList: new LinkedList(),

  populateLinkedList (words) {
    words.forEach(word => {
      this.linkedList.insertLast(word)
    });
  }
}

module.exports = LinkedListService