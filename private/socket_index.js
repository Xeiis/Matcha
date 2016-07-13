var Mongo = require ('./mongodb.js');
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

exports.login = function(data, req, res) {
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        console.log("Connected correctly to server");
        Mongo.find(db, function (docs) {
            db.close();
            if(docs[0]) {
                if (passwordHash.verify(data.password, docs[0].password)) {
                    req.session.login = data.login;
                    console.log(req.session.login);
                    res.send(data.login);
                } else
                    res.send('Mauvais login / Mot de passe');
            }
            else
                res.send('Mauvais login / Mot de passe');
        }, {'login': data.login}, 'user');
    });
};

exports.get_profile_data = function(req, res) {
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        console.log("Connected correctly to server");
        Mongo.find(db, function (docs) {
            db.close();
            res.send(docs);
        }, {}, 'user');
    });
};