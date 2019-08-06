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

}

module.exports = LanguageService
