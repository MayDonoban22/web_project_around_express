const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js')//commonjs

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mydb').then(() => { //direccion IP requerible
  console.log('Connected to MongoDB');
})
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

const { PORT = 3000 } = process.env;
app.use((req, res, next) => {
  req.user = {
    _id: '678b09a199c41466ea77c57f' // pega el _id del usuario de prueba que creamos en el paso anterior
  };

  next();
});
app.use('/cards', cardsRoutes),
  app.use('/users', usersRoutes)


app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}...`);
});




