var Mongo = require ('./mongodb.js');

exports.renderProfile = function(req,res,next)
{
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (docs) {
            if(docs) {
                res.render('profile', {nom: docs[0].nom || '', prenom: docs[0].prenom || '', email: docs[0].email || '', ville: docs[0].ville || '', cp: docs[0].cp || '', date: docs[0].date || '', attirance: docs[0].attirance || '', sexe: docs[0].sexe || '', description: docs[0].description || '', login: docs[0].login || '', images : docs[0].url, answer : req.query.answer, deletes : req.query.delete, picture : req.query.photo});
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

    console.log(data);
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
    if (req.session.login) 
        var pull = {visiteur: {login: req.session.login}};
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.updateMulti(db, function (result) {
            db.close();
        }, {login : username}, {$pull: pull}, 'user');
    });

    Mongo.Client.connect(Mongo.url, function (err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (docs) {
            db.close();
            if (docs[0])
            {
                var visiteur = {visiteur: {login: req.session.login, date: date_today(), photo: docs[0].profile}};
                Mongo.Client.connect(Mongo.url, function(err, db) {
                    Mongo.assert.equal(null, err);
                    Mongo.update(db, function () {
                        db.close();
                    }, {login : username}, {$push: visiteur}, 'user');
                });
            }
        }, {'login': req.session.login}, 'user');
    });
    
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

function date_today() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var second = today.getSeconds();

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    if (hours < 10){
        hours = '0' + hours;
    }
    if (minutes < 10){
        minutes = '0' + minutes;
    }
    if (second < 10){
        second = '0' + second;
    }
    today = yyyy + '/' + mm + '/' + dd + ',' + hours + ':' + minutes + ':' + second;
    return today;
}



