var express = require('express');
var router = express.Router();
var index = require('../private/index.js');
var profile = require('../private/profile.js');
var index_function = require('../private/socket_index.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  index.renderIndex(req, res, next);
});

router.get('/lol', function(req, res, next) {
  res.render('lol', { title: 'Express' });
});

router.get('/profile', function(req, res, next) {
  profile.renderProfile(req, res, next);
});

router.post('/login', function(req, res){
  index_function.login(req.body, req, res);
});

router.post('/update_profile', function(req, res){
  console.log(req.body);
  profile.update_profile(req.body, req, res);
});

router.post('/get_profile_data', function(req, res){
  index_function.get_profile_data(req, res);
});

router.post('/logout', function(req, res){
  req.session.destroy();
  res.send('Done');
});

router.post('/photo_add', function(req, res){
    var data = new Object();

    data.url = req.file.path.substring(req.file.path.indexOf('/') + 1);
    data.login = req.session.login;
    profile.photo_add(data, req, res);
});

router.post('/suppr_images', function(req, res){
    profile.photo_suppr(req.body, req, res);
});

router.param('id', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE',id);
  next();
});

router.get('/user/:id', function (req, res, id) {
  res.render('user', { id: req.params.id, q : req.query.q});
});

router.get('/test/jade_demo', function (req, res, id) {
  var ob = { action:"date +%s", result:"1367263074"};
  res.render('test', { pageTitle: 'Jade Demo',  youAreUsingJade: true, json : ob });
});

module.exports = router;