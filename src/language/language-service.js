const LinkedList = require('../linked-list/linked-list');

const LanguageService = {

  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score'
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },

  getNextWord(db, id){
    return db
      .from('word')
      .select('id',
      'next',
      'original',
      'correct_count',
      'incorrect_count')
      .where({id})
      .first();
  },
  
  updateWord(db, word){
    return db
      .from('word')
      .where({id: word.id})
      .update({
        correct_count: word.correct_count,
        incorrect_count: word.incorrect_count,
        memory_value: word.memory_value
      })
  },

  updateTotalScore(db, language){
    return db
    .from('language')
    .where({id: language.id})
    .update({
      total_score: language.total_score+1,
    })
  },

  populateLinkedList(language, words) {
    let linkedList = new LinkedList();

    linkedList.id = language.id;
    linkedList.name = language.name;
    linkedList.total_score = language.total_score;

    let word = words.find(w => w.id === language.head);

    linkedList.insertFirst(word);

    while (word.next) {
      word = words.find(w => w.id === word.next);
      linkedList.insertLast(word);
    }
    return linkedList;
  },

  persistLinkedList(db, linkedLanguage) {

      let newWordsArr = [];
      let currNode = linkedLanguage.head;
      while(currNode.next){
        newWordsArr.push(currNode);
        currNode = currNode.next;
      }

    return db.transaction(trx =>
        
      Promise.all([
        db('language')
          .transacting(trx)
          .where('id', linkedLanguage.id)
          .update({
            total_score: linkedLanguage.total_score,
            head: linkedLanguage.head.value.id,
          }),

          //linkedLanguage = {head: node{next:}, id, total_score, }
        
        // newWordsArr.forEach(node =>
        //   db('word')
        //     .transacting(trx)
        //     .where('id', node.value.id)
        //     .update({
        //       memory_value: node.value.memory_value,
        //       correct_count: node.value.correct_count,
        //       incorrect_count: node.value.incorrect_count,
        //       next: node.next ? node.next.value.id : null,
        //     })
        // )
      ])
    )

  },

}

module.exports = LanguageService
