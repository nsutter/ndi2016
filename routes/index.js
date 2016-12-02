var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Event = require('../models/event');

var NodeGeocoder = require('node-geocoder');

var router = express.Router();

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username, address : req.body.address, name : req.body.name, purpose : req.body.purpose, email : req.body.email, website : req.body.website }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.post('/add_event', function(req, res) {

  var options = {
    provider: 'google',

    // configuration du géocoding avec Google Maps
    httpAdapter: 'https',
    apiKey: 'AIzaSyBSgoZTf61bLHq-ZCJEIE3SHKIBx7gUIOk',
    formatter: null
  };

  var geocoder = NodeGeocoder(options);

  geocoder.geocode(req.body.where)
    .then(function(geores) {

      var latitude = geores[0].latitude;
      var longitude = geores[0].longitude;

      console.log(latitude + " - " + longitude +" - " + req.body.category);

      var nouvelEvent = new Event({
        title : req.body.title,
        what : req.body.what,
        category : req.body.category,
        when : req.body.when,
        where : req.body.where,
        who : req.user.username,
        latitude : latitude,
        longitude : longitude
      });

      nouvelEvent.save(function (err) {
        if (err) return console.log(err);
          return res.redirect("/asso");
      })

    });
});

router.get('/asso', function(req, res) {
    res.render('asso', { asso : req.user });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/asso');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/health', function(req, res){
  Event.find({category: "health", longitude: {$lt: parseFloat(req.body.StartLon) + 0.1, $gt: parseFloat(req.body.StartLon) - 0.1}, latitude: {$lt: parseFloat(req.body.StartLat)+0.1, $gt: parseFloat(req.body.StartLat)-0.1}}, function(err, resultat) {
    res.render('event', {title: "health", resultat: resultat, myposlat: req.body.StartLat, myposlong: req.body.StartLon});
  });
});

router.post('/bed', function(req, res){
  Event.find({category: "bed", longitude: {$lt: parseFloat(req.body.StartLon) + 0.1, $gt: parseFloat(req.body.StartLon) - 0.1}, latitude: {$lt: parseFloat(req.body.StartLat)+0.1, $gt: parseFloat(req.body.StartLat)-0.1}}, function(err, resultat) {
    res.render('event', {title: "bed", resultat: resultat, myposlat: req.body.StartLat, myposlong: req.body.StartLon});
  });
});

router.post('/shower', function(req, res){
  Event.find({category: "shower", longitude: {$lt: parseFloat(req.body.StartLon) + 0.1, $gt: parseFloat(req.body.StartLon) - 0.1}, latitude: {$lt: parseFloat(req.body.StartLat)+0.1, $gt: parseFloat(req.body.StartLat)-0.1}}, function(err, resultat) {
    res.render('event', {title: "shower", resultat: resultat, myposlat: req.body.StartLat, myposlong: req.body.StartLon});
  });
});

router.post('/eat', function(req, res){
  Event.find({category: "eat", longitude: {$lt: parseFloat(req.body.StartLon) + 0.1, $gt: parseFloat(req.body.StartLon) - 0.1}, latitude: {$lt: parseFloat(req.body.StartLat)+0.1, $gt: parseFloat(req.body.StartLat)-0.1}}, function(err, resultat) {
    res.render('event', {title: "eat", resultat: resultat, myposlat: req.body.StartLat, myposlong: req.body.StartLon});
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'titel - a portal sponsored by MSF', user : req.user });
});

router.get('/about', function(req, res) {
    res.render('about', { asso : req.user });
});

module.exports = router;
