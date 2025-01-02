const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {

  const dataPathCards = path.join(__dirname, "../data", 'cards.json');
  fs.readFile(dataPathCards, { encoding: 'utf8' }, (err, data) => {
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
