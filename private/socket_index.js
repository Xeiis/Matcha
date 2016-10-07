var Mongo = require ('./mongodb.js');
var passwordHash = require('password-hash');
var ip = require("ip");
var geoip = require('geoip-lite');
var nodemailer = require('nodemailer');

exports.inscription = function(data, callback) {
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

var ip_address = '62.210.32.115'; // ip.address();

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
                        Mongo.find(db, function (doc) {
                            db.close();
                            res.send({doc : doc, me : docs});
                        }, {login: {$ne: req.session.login}}, 'user');
                    });
                }
                else if (attirance == "H" || attirance == "F") {
                    // Use connect method to connect to the Server
                    Mongo.Client.connect(Mongo.url, function (err, db) {
                        Mongo.assert.equal(null, err);
                        Mongo.find(db, function (doc) {
                            db.close();
                            res.send({doc : doc, me : docs});
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
    if (!data)
    {
        var geo = geoip.lookup(ip_address);
        data.latitude = geo.ll[0];
        data.longitude = geo.ll[1];
    }
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

exports.add_new_tag = function (tag, req, res) {
    Mongo.Client.connect(Mongo.url, function (err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (doc) {
            if (doc != '')
                res.send('fail');
            else {
                Mongo.insertOne(db, function () {
                    db.close();
                    res.send('done');
                }, tag, 'tag');
            }
        }, tag, 'tag');
    });
};

exports.forgot_password = function (data, req, res){
    var password = aleatoire(8);
    data.password = passwordHash.generate(password);
    console.log(data.email);
    Mongo.Client.connect(Mongo.url, function (err, db) {
        Mongo.assert.equal(null, err);
        Mongo.update(db, function () {
            db.close();
            var transporter = nodemailer.createTransport();
            var mailOptions = {
                from: 'matcha@gmail.com',
                to: data.email,
                subject: 'Oublie de mot de passe',
                text: 'Votre nouveau mot de passe est : ' + password,
                html: '<b>Votre nouveau mot de passe est : ' + password + '</b>'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });
            transporter.close();
            res.send('done');
        }, {email: data.email}, {$set: {password: password}}, 'user');
    });
};

function aleatoire(size) {
    var liste = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
        ,"0","1","2","3","4","5","6","7","8","9",
        "!","@","#","$","%","^","&","*","(",")","_","-","=","+","[","]","{","}","\\","|",";",":",",","<","\.",">","/","?"];
    var result = '';
    for (i = 0; i < size; i++) {
        result += liste[Math.floor(Math.random() * liste.length)];
    }
    return result;
}