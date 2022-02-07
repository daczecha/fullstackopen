const mongoose = require('mongoose');
const url = process.env.MONGO_URI;

console.log('connecting to', url);
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const numberSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'User phone number required'],
  },
  number: {
    type: String,
    minLength: 8,
    required: [true, 'User phone number required'],
    validate: {
      validator: function (v) {
        return /^(\d{2,3})-(\d{6,})$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

numberSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Number', numberSchema);
