var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Event = require('../models/event');
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

router.get('/asso', function(req, res) {
    res.render('asso', { asso : req.user });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/health', function(req, res){
  Event.find({})
  res.render('event', {title: "health", lat: req.body.StartLat, lon: req.body.StartLon})
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'titel - Make immigration great again', user : req.user });
});

module.exports = router;
