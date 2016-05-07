var express = require('express');
var router = express.Router();
var session = require('express-session');

function select(){
  var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the document collection");
      callback(result);
    });
  };

  var updateDocument = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a : 2 }
        , { $set: { b : 1 } }, function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          console.log("Updated the document with the field a equal to 2");
          callback(result);
        });
  };

  var deleteDocument = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.deleteOne({ a : 1 }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Removed the document with the field a equal to 1");
      callback(result);
    });
  };

  var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      //assert.equal(2, docs.length);
      console.log("Found the following records");
      console.dir(docs);
      callback(docs);
    });
  };

  var MongoClient = require('mongodb').MongoClient
      , assert = require('assert');

// Connection URL
  var url = 'mongodb://localhost:27017/';
// Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    insertDocuments(db, function() {
      updateDocument(db, function() {
        deleteDocument(db, function() {
          findDocuments(db, function() {
            db.close();
          });
        });
      });
    });
  });
}

var sess;
/* GET home page. */
router.get('/', function(req, res, next) {
  sess = req.session;
  res.render('index', { title: 'Express' });
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