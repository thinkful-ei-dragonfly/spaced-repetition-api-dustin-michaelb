const LinkedList = require('./linked-list');


const LinkedListService = {
  linkedList: new LinkedList(),

  populateLinkedList(words) {
    words.forEach(word => {
      this.linkedList.insertLast(word);
    });
  },
  guessCheck(guess) {
    let result = false;
    if (guess === this.linkedList.head.value.translation) {
      this.linkedList.head.value.memory_value *= 2;
      this.linkedList.head.value.correct_count++;
      result = true;
    } else {
      this.linkedList.head.value.memory_value = 1;
      this.linkedList.head.value.incorrect_count++;
    }
    const memValSave = this.linkedList.head.value.memory_value;
    const head = this.linkedList.head.value;
    this.linkedList.head = this.linkedList.head.next;
    this.linkedList.insertAt(head, memValSave);

    if(result){
      return {correct: true, word: head};
    } return {correct: false, word: head};
  }
};

module.exports = LinkedListService;
