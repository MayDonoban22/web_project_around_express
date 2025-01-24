const { NotFoundError, ValidationError } = require('../errors/error.js');
const User = require('../models/user.js')

async function createUser(req, res) {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });
    res.status(201).send(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error al crear el usuario" });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find().orFail((err) => {
      throw new NotFoundError('Usuario no encontrado');
    });
    res.json(users);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function getUsersId(req, res) {

  try {

    if (req.params.id == undefined) {
      throw new ValidationError('El id del usuario no existe');
    }

    const findUser = await User.findById(req.params._id).orFail((err) => {
      throw new NotFoundError('Usuario no encontrado');
    });

    res.json(findUser);
  } catch (err) {
    console.error('Error al obtener usuario por ID:', err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function updateProfile(req, res) {
  const { name, about } = req.body;
  const userId = req.user._id;


  try {

    if (!name && !about) {
      throw new ValidationError('Debes proporcionar al menos un campo para actualizar (name o about)');
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true }
    ).orFail(() => {
      throw new NotFoundError('Usuario no encontrado');
    });

    res.status(200).send(updatedUser);
  } catch (err) {
    console.error('Error al actualizar el perfil:', err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function updateAvatar(req, res) {
  const { avatar } = req.body;
  const userId = req.user._id;
  try {
    if (!avatar) {
      throw new ValidationError('Debes proporcionar al menos un campo para actualizar (name o about)');
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true }
    ).orFail(() => {
      throw new NotFoundError('Usuario no encontrado');
    });

    res.status(200).send(updatedUser);
  } catch (err) {
    console.error('Error al actualizar el avatar:', err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}


module.exports = { getUsersId, getUsers, createUser, updateProfile, updateAvatar }