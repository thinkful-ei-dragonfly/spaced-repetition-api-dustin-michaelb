const LinkedList = require('./linked-list');

const LinkedListService = {
  // linkedList: new LinkedList(),

  // populateLinkedList(language, words) {
  //   let linkedList = new LinkedList();

  //   linkedList.id = language.id;
  //   linkedList.name = language.name;
  //   linkedList.total_score = language.total_score;

  //   let word = words.find(w => w.id === language.head);

  //   linkedList.insertFirst(word);

  //   while (word.next) {
  //     word = words.find(w => w.id === word.next);
  //     linkedList.insertLast(word);
  //   }
  //   return linkedList;
  // },

  // guessCheck(guess, ll) {
  //   if (guess === ll.head.value.translation) {
  //     ll.head.value.memory_value *= 2;
  //     ll.head.value.correct_count++;
  //   } else {
  //     ll.head.value.memory_value = 1;
  //     ll.head.value.incorrect_count++;
  //   }
  //   const memValSave = ll.head.value.memory_value;
  //   const head = ll.head.value;
  //   ll.head = ll.head.next;
  //   ll.insertAt(head, memValSave);

  //   return ll;
  // }
};

module.exports = LinkedListService;
