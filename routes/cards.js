const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { createCard, getCards, deleteCardById, likeCard, dislikeCard } = require('../controllers/cards.js')

router.post('/', createCard);
router.get('/', getCards);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
