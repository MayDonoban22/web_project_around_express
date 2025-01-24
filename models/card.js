const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const regex = /^https?:\/\/(www.)?[a-zA-Z0-9.-]+.[a-zA-Z](\/)?[._~:/?%#\[\]@!\$&'\(\)\*\+,;=a-zA-Z0-9]*/
        return regex.test(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },

},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('card', cardSchema);