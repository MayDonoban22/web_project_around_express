const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,

  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const regex = /^https?:\/\/(www.)?[a-zA-Z0-9.-]+.[a-zA-Z](\/)?[._~:/?%#\[\]@!\$&'\(\)\*\+,;=a-zA-Z0-9]*/
        return regex.test(v);
      },

      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
})


module.exports = mongoose.model('user', userSchema);
