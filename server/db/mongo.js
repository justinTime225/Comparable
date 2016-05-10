var mongoose = require('mongoose');

var port = process.env.MONGODB_URI || 'mongodb://localhost/comparable';
mongoose.connect(port);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('Mongodb connection open');
});


var offerSchema = mongoose.Schema({
  userEmail: {
    type: String
  },
  title: {
    type: String
  },
  location: {
    type: String
  },
  salary: {
    type: Number
  },
  equity: {
    type: String
  }
});

module.exports = mongoose.model('Offer', offerSchema);