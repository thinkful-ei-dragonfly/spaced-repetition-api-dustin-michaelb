const express = require('express');
const LanguageService = require('./language-service');
const LinkedListService = require('./../linked-list/linked-list-service');
const { requireAuth } = require('../middleware/jwt-auth');

const jsonBodyParser = express.json();
const languageRouter = express.Router();

languageRouter.use(requireAuth).use(async (req, res, next) => {
  try {
    const language = await LanguageService.getUsersLanguage(
      req.app.get('db'),
      req.user.id
    );

    if (!language)
      return res.status(404).json({
        error: `You don't have any languages`
      });

    req.language = language;
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get('/', async (req, res, next) => {
  try {
    const words = await LanguageService.getLanguageWords(
      req.app.get('db'),
      req.language.id
    );

    res.json({
      language: req.language,
      words
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get('/head', async (req, res, next) => {
  try {
    const nextWord = await LanguageService.getNextWord(
      req.app.get('db'),
      req.language.head
    );

    res.json({
      nextWord: nextWord.original,
      wordCorrectCount: nextWord.correct_count,
      wordIncorrectCount: nextWord.incorrect_count,
      totalScore: req.language.total_score
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.route('/guess').post(jsonBodyParser, async (req, res, next) => {
  try {
    //Validate req body has guess
    if (!req.body.guess) {
      return res.status(400).json({ error: `Missing 'guess' in request body` });
    }
    const words = await LanguageService.getLanguageWords(
      req.app.get('db'),
      req.language.id
    );

    const result = {
      isCorrect: false
    }

    let ll = LanguageService.populateLinkedList(req.language, words); //return a linked list
    //somewhere in here we aren't updating the list correctly
    if (req.body.guess === ll.head.value.translation) {
      ll.head.value.memory_value *= 2;
      ll.head.value.correct_count++;
      ll.total_score = ll.total_score + 1;
      result.isCorrect = true
    } else {
      ll.head.value.memory_value = 1;
      ll.head.value.incorrect_count++;
    }

    const memValSave = ll.head.value.memory_value;
    const head = ll.head.value;
    ll.head = ll.head.next;
    ll.insertAt(head, memValSave);
    await LanguageService.persistLinkedList(req.app.get('db'), ll);

    result.answer = head.translation
    result.nextWord = ll.head.value.original
    result.totalScore = ll.total_score
    result.wordCorrectCount = ll.head.value.correct_count
    result.wordIncorrectCount = ll.head.value.incorrect_count

    res.json(result);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = languageRouter;
