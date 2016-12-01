var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Event = new Schema({
  title: String,
  what: String,
  when: Date,
  longitude: Number,
  latitude: Number,
  who: String,
  categorie: String
});

Event.plugin(passportLocalMongoose);

module.exports = mongoose.model('Event', Event);
