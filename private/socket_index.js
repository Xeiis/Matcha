var Mongo = require ('./mongodb.js');
var passwordHash = require('password-hash');

exports.inscription = function(data, callback) {
    console.log(data);
    // Use connect method to connect to the Server
    data.password = passwordHash.generate(data.password);
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.insertOne(db, function () {
            db.close();
            callback(data);
        }, data, 'user');
    });
};

exports.login = function(data, req, res) {
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function (err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (docs) {
            db.close();
            if (docs[0]) {
                if (passwordHash.verify(data.password, docs[0].password)) {
                    // changer la donner connection dans la bdd
                    Mongo.Client.connect(Mongo.url, function (err, db) {
                        Mongo.assert.equal(null, err);
                        Mongo.update(db, function () {
                            db.close();
                        }, {login: req.session.login}, {$set: {logged : true}}, 'user');
                    });
                    req.session.login = data.login;
                    res.send(data.login);
                } else
                    res.send('Mauvais login / Mot de passe');
            }
            else
                res.send('Mauvais login / Mot de passe');
        }, {'login': data.login}, 'user');
    });
};

exports.logout = function(req){
    Mongo.Client.connect(Mongo.url, function (err, db) {
        Mongo.assert.equal(null, err);
        Mongo.update(db, function () {
            db.close();
            req.session.destroy();
        }, {login: req.session.login}, {$set: {logged : false}}, 'user');
    });
};

exports.get_profile_data = function(req, res) {
    var attirance;
    // Use connect method to connect to the Server
    if (req.session.login) {
        Mongo.Client.connect(Mongo.url, function (err, db) {
            Mongo.assert.equal(null, err);
            Mongo.find(db, function (docs) {
                db.close();
                if (docs[0].attirance)
                    attirance = docs[0].attirance;
                else if (docs[0].sexe == "H")
                    attirance = "F";
                else if (docs[0].sexe == "F")
                    attirance = "H";
                if (attirance == "HF") {
                    // Use connect method to connect to the Server
                    Mongo.Client.connect(Mongo.url, function (err, db) {
                        Mongo.assert.equal(null, err);
                        Mongo.find(db, function (docs) {
                            db.close();
                            console.log(docs);
                            res.send(docs);
                        }, {login: {$ne: req.session.login}}, 'user');
                    });
                }
                else if (attirance == "H" || attirance == "F") {
                    // Use connect method to connect to the Server
                    Mongo.Client.connect(Mongo.url, function (err, db) {
                        Mongo.assert.equal(null, err);
                        Mongo.find(db, function (docs) {
                            db.close();
                            res.send(docs);
                        }, {$and: [ {login: {$ne: req.session.login} }, {sexe: {$eq: attirance} }, {$or: [ {attirance: {$eq: docs[0].sexe} }, {attirance: {$eq: "HF"}} ]} ]}, 'user');
                    });
                }
            }, {'login': req.session.login}, 'user');
        });
    }
    else
    {
        // Use connect method to connect to the Server
        Mongo.Client.connect(Mongo.url, function (err, db) {
            Mongo.assert.equal(null, err);
            Mongo.find(db, function (docs) {
                db.close();
                res.send(docs);
            }, {}, 'user');
        });
    }
};

exports.save_position = function(data, req, res) {
    // Use connect method to connect to the Server
    if (req.session.login) {
        Mongo.Client.connect(Mongo.url, function (err, db) {
            Mongo.assert.equal(null, err);
            Mongo.update(db, function () {
                db.close();
                res.send('done');
            }, {login: req.session.login}, {$set: data}, 'user');
        });
    }
    else
        res.end();
};