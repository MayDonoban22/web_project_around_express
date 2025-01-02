const express = require('express');
const usersRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js')

const app = express();
const { PORT = 3000 } = process.env;

app.use('/cards', cardsRoutes),
  app.use('/users', usersRoutes)

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}...`);
});


