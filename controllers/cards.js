const { NotFoundError, ValidationError } = require('../errors/error.js');
const Card = require('../models/card.js')

async function createCard(req, res) {
  const { name, link } = req.body;
  const userId = '677c46b1b6e81c32a3d26415';

  if (!name || !link) {
    return res.status(400).send({ message: 'Nombre y link son obligatorios' });
  }

  try {
    const newCard = await Card.create({
      name,
      link,
      owner: userId,
    });
    res.status(201).json(newCard);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error al crear la tarjeta' });
  }

}

async function getCards(req, res) {
  try {
    const cards = await Card.find().populate('owner').orFail((err) => {
      throw new NotFoundError('Usuario no encontrado');
    });
    res.json(cards);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(err.statusCode || 500).send({ message: err.message });
  }
}

async function deleteCardById(req, res) {
  const { cardId } = req.params;
  try {
    if (cardId == undefined) {
      throw new ValidationError('El id de la carta no existe');
    }
    await Card.findByIdAndDelete(cardId).orFail((err) => {
      throw new NotFoundError('Usuario no encontrado');
    });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).send({ message: err.message });
  }
}

async function likeCard(req, res) {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );

    if (!card) {
      throw new ValidationError('Tarjeta no encontrada');
    }

    res.status(200).json({ message: 'Like registrado correctamente', card });
  } catch (err) {
    console.error('Error al dar like:', err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function dislikeCard(req, res) {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );

    if (!card) {
      throw new ValidationError('Tarjeta no encontrada');
    }

    res.status(200).json({ message: 'Like removido correctamente', card });
  } catch (err) {
    console.error('Error al dar dislike:', err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = { createCard, getCards, deleteCardById, likeCard, dislikeCard }