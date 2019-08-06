const express = require('express')
const LanguageService = require('./language-service')
const LinkedListService = require('./../linked-list/linked-list-service')
const { requireAuth } = require('../middleware/jwt-auth')

const jsonBodyParser = express.json()
const languageRouter = express.Router()

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    try {
    const nextWord = await LanguageService.getNextWord(
      req.app.get('db'), req.language.head);

    res.json({
      nextWord: nextWord.original,
      wordCorrectCount: nextWord.correct_count,
      wordIncorrectCount: nextWord.incorrect_count,
      totalScore: req.language.total_score
    })
    next();
  } catch(error){
    next(error)
  }
  })

languageRouter
  .route('/guess')
  .post( jsonBodyParser, async (req, res, next) => {
    
    try {
      //Validate req body has guess
      if(!req.body.guess){
        return res.status(404).json({error: 'Guess not recieved'})
      }
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )
      LinkedListService.populateLinkedList(words)

      const wordObj = LinkedListService.guessCheck(req.body.guess);

      console.log(wordObj);

      if(wordObj.correct){
        await LanguageService.updateTotalScore(req.app.get('db'), req.language);
      } 
        await LanguageService.updateWord(req.app.get('db'), wordObj.word);
      
        //gracias => perro => gato
        //perro => gato => gracias => ??
      
      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

module.exports = languageRouter
