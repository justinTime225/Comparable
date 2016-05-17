const mongoose = require('mongoose');

const port = process.env.MONGODB_URI || 'mongodb://localhost/comparable';
mongoose.connect(port);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Mongodb connection open');
});

const offerSchema = mongoose.Schema({
  userEmail: {
    type: String,
  },
  title: {
    type: String,
  },
  location: {
    type: String,
  },
  salary: {
    type: Number,
  },
  equity: {
    type: String,
  },
});

module.exports = mongoose.model('Offer', offerSchema);
