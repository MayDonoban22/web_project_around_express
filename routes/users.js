const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id.length < 23) {
    return res.status(400).send({ message: 'Invalid id' });
  }
  const dataPathUsers = path.join(__dirname, "../data", 'users.json');
  fs.readFile(dataPathUsers, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Ha ocurrido un error en el servidor" });
    }

    try {

      const jsonData = JSON.parse(data);
      const user = jsonData.find(user => user._id === id);
      if (!user) {
        return res.status(404).send({ message: "El usuario no existe" });
      }
      return res.status(200).send(user);

    } catch (error) {
      console.error('Error al parsear el JSON:', error);
      return res.status(500).send({ message: "Ha ocurrido un error en el servidor" });
    }

  });
});

router.get('/', (req, res) => {

  const dataPathUsers = path.join(__dirname, "../data", 'users.json');
  fs.readFile(dataPathUsers, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Ha ocurrido un error en el servidor" });
    }

    try {

      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (error) {
      console.error('Error al parsear el JSON:', error);
      return res.status(500).send({ message: "Ha ocurrido un error en el servidor" });
    }

  });
});

module.exports = router;