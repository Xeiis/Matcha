var Mongo = require ('./mongodb.js');
var assert = require('assert');
var passwordHash = require('password-hash');

exports.inscription = function(data, callback) {
    data.password = passwordHash.generate(data.password);
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        console.log("Connected correctly to server");
        Mongo.insertOne(db, function () {
            db.close();
            callback(data);
        }, data, 'user');
    });
};

exports.login = function(data, callback) {
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        console.log("Connected correctly to server");
        Mongo.find(db, function (docs) {
            db.close();
            console.log(data.password);
            console.log(docs[0].password);
            if(passwordHash.verify(data.password, docs[0].password))
                callback(data);
            else
                callback(false);
        }, {'login': data.login}, 'user');
    });
};