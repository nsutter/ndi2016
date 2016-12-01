var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
  username: String,
  password: String,
  name: String,
  address: String,
  purpose: String,
  email: String,
  website: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
