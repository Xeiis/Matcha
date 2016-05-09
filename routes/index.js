var express = require('express');
var router = express.Router();
var index = require('../private/index.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  index.renderIndex(req, res, next);
});

router.get('/lol', function(req, res, next) {
  res.render('lol', { title: 'Express' });
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