var Mongo = require ('./mongodb.js');

exports.renderProfile = function(req,res)
{
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (docs) {
            if(docs) {
                console.log(docs);
                Mongo.find(db, function (doc) {
                    if (doc) {
                        var tags = {};
                        var i = 0;
                        while (doc[i])
                        {
                            tags[i] = doc[i].tag;
                            i++;
                        }
                        res.render('profile', {
                            nom: docs[0].nom || '',
                            prenom: docs[0].prenom || '',
                            email: docs[0].email || '',
                            ville: docs[0].ville || '',
                            cp: docs[0].cp || '',
                            date: docs[0].date || '',
                            attirance: docs[0].attirance || '',
                            sexe: docs[0].sexe || '',
                            description: docs[0].description || '',
                            login: docs[0].login || '',
                            images: docs[0].url,
                            tag : docs[0].tag,
                            tags: tags,
                            answer: req.query.answer,
                            deletes: req.query.delete,
                            picture: req.query.photo
                        });
                    }
                    else {
                        res.render('profile_error');
                    }
                }, {}, 'tag');
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
         }, {login: req.session.login}, {$push: data}, 'user');
     });
 };

exports.add_profile_tag = function(data, req, res) {

    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.update(db, function () {
            db.close();
            res.send('done');
        }, {login: req.session.login}, {$push: data}, 'user');
    });
};

exports.suppr_profile_tag = function(data, req, res) {
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.update(db, function () {
            db.close();
            res.send('done');
        }, {login : req.session.login}, {$pull: data}, 'user');
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
    console.log(data);
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
    // permet d'indiquer que la personne a visiter le profil
    if (req.session.login) {
        // supprime la derniere visite
        var pull = {visiteur: {login: req.session.login}};
        Mongo.Client.connect(Mongo.url, function (err, db) {
            Mongo.assert.equal(null, err);
            Mongo.updateMulti(db, function () {
                db.close();
            }, {login: username}, {$pull: pull}, 'user');
        });
        // indique la visite d'ajd.
        Mongo.Client.connect(Mongo.url, function (err, db) {
            Mongo.assert.equal(null, err);
            Mongo.find(db, function (docs) {
                db.close();
                if (docs[0]) {
                    var visiteur = {visiteur: {login: req.session.login, date: date_today(), photo: docs[0].profile}};
                    Mongo.Client.connect(Mongo.url, function (err, db) {
                        Mongo.assert.equal(null, err);
                        Mongo.update(db, function () {
                            db.close();
                        }, {login: username}, {$push: visiteur}, 'user');
                    });
                }
            }, {'login': req.session.login}, 'user');
        });
    }
    
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (docs) {
            db.close();
            if(docs) {
                res.render('profile_page', {
                    nom: docs[0].nom || '',
                    prenom: docs[0].prenom || '',
                    email: docs[0].email || '',
                    ville: docs[0].ville || '',
                    cp: docs[0].cp || '',
                    date: docs[0].date || '',
                    attirance: docs[0].attirance || '',
                    sexe: docs[0].sexe || '',
                    description: docs[0].description || '',
                    login: docs[0].login || '',
                    images: docs[0].url,
                    tag : docs[0].tag,
                    logged: docs[0].logged || ''
                });
            }
            else {
                res.render('profile_error');
            }
        }, {'login': username}, 'user');
    });
};

exports.like_profile = function(username, req, res){
    var find = 0;
    var match = 0;
    var like;
    if (req.session.login) {
        Mongo.Client.connect(Mongo.url, function(err, db) {
            Mongo.assert.equal(null, err);
            Mongo.find(db, function (docs) {
                if(docs) {
                    Mongo.find(db, function (doc) {
                        if (doc) {
                            var i = 0;
                            while (docs[0].like[i]) {
                                if (docs[0].like[i].login == username.login) {
                                    match = 1;
                                    matchs = {match : {login: req.session.login, date: date_today(), photo: docs[0].profile}};
                                    Mongo.update(db, function () {
                                    }, {login: username.login}, {$push: matchs}, 'user');
                                    matchs = {match : {login: username.login, date: date_today(), photo: doc[0].profile}};
                                    Mongo.update(db, function () {
                                    }, {login: req.session.login}, {$push: matchs}, 'user');
                                }
                                i++;
                            }
                            if (doc[0].like) {
                                i = 0;
                                while (doc[0].like[i]) {
                                    if (doc[0].like[i].login == req.session.login) {
                                        find = 1;
                                        like = {like: {login: req.session.login}};
                                        Mongo.update(db, function () {
                                            db.close();
                                            res.send('unlike');
                                        }, {login: username.login}, {$pull: like}, 'user');
                                    }
                                    i++;
                                }

                            }
                            if (find == 0) {
                                like = {like: {login: req.session.login, date: date_today(), photo: doc[0].profile}};
                                Mongo.update(db, function () {
                                    db.close();
                                    res.send('like');
                                }, {login: username.login}, {$push: like}, 'user');
                            }
                        }
                    }, {'login' : username.login}, 'user');
                }
            }, {'login': req.session.login}, 'user');
        });

    }
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



