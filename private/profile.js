var Mongo = require ('./mongodb.js');

exports.renderProfile = function(req,res,next)
{
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (docs) {
            if(docs) {
                res.render('profile', {nom: docs[0].nom || '', prenom: docs[0].prenom || '', email: docs[0].email || '', ville: docs[0].ville || '', cp: docs[0].cp || '', date: docs[0].date || '', attirance: docs[0].attirance || '', sexe: docs[0].sexe || '', description: docs[0].description || '', login: docs[0].login || '', images : docs[0].url, answer : req.query.answer, deletes : req.query.delete});
            }
            else {
                res.render('profile_error');
            }
        }, {'login': req.session.login}, 'user');
    });
};

exports.update_profile = function(data, req, res)
{
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.update(db, function () {
            db.close();
            res.send('done');
        }, {login :req.session.login},  {$set: data}, 'user');
    });
};

exports.photo_add = function(data, req, res) {
     // Use connect method to connect to the Server
     Mongo.Client.connect(Mongo.url, function(err, db) {
     Mongo.assert.equal(null, err);
     Mongo.update(db, function () {
         db.close();
         res.redirect('http://localhost:3000/profile?answer=yes')
         }, {login : req.session.login}, {$push: data}, 'user');
     });
 };

exports.photo_suppr = function(data, req, res) {
     // Use connect method to connect to the Server
     Mongo.Client.connect(Mongo.url, function(err, db) {
     Mongo.assert.equal(null, err);
         Mongo.update(db, function () {
             db.close();
             res.send('done');
         }, {login : req.session.login}, {$pull: data}, 'user');
    });
};

exports.photo_profile = function(data, req, res) {
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.update(db, function () {
            db.close();
            res.send('done');
        }, {login : req.session.login}, {$set: data}, 'user');
    });
};

exports.show_profile = function(username, req, res) {
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (docs) {
            if(docs) {
                res.render('profile_page', {nom: docs[0].nom || '', prenom: docs[0].prenom || '', email: docs[0].email || '', ville: docs[0].ville || '', cp: docs[0].cp || '', date: docs[0].date || '', attirance: docs[0].attirance || '', sexe: docs[0].sexe || '', description: docs[0].description || '', login: docs[0].login || '', images : docs[0].url});
            }
            else {
                res.render('profile_error');
            }
        }, {'login': username}, 'user');
    });
};



