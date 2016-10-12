var Mongo = require ('./mongodb.js');

exports.renderProfile = function(req,res)
{
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (docs) {
            if(docs) {
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
                            longitude: docs[0].longitude,
                            latitude: docs[0].latitude,
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
            res.end();
        }, {login :req.session.login},  {$set: data}, 'user');
    });
};

exports.photo_add = function(req, res) {
    var data = {};
    if (typeof(req.file) == 'undefined') {
        res.redirect('http://localhost:3000/profile?photo=false');
        res.end();
    }
    data.url = req.file.path.substring(req.file.path.indexOf('/') + 1);
    // Use connect method to connect to the Server
    if ((req.file.originalname.substr(-3) == 'png' || req.file.originalname.substr(-3) == 'jpg' || req.file.originalname.substr(-4) == 'jpeg')) {
        Mongo.Client.connect(Mongo.url, function (err, db) {
            Mongo.assert.equal(null, err);
            Mongo.update(db, function () {
                db.close();
                res.redirect('http://localhost:3000/profile?answer=yes');
                res.end();
            }, {login: req.session.login}, {$push: {url : data.url}}, 'user');
        });
    }
    else {
        res.redirect('http://localhost:3000/profile?photo=falses');
        res.end();
    }
 };

exports.add_profile_tag = function(data, req, res) {
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.update(db, function () {
            db.close();
            res.send('done');
            res.end();
        }, {login: req.session.login}, {$push: data}, 'user');
    });
};

exports.report_profile = function(data, req, res) {
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.update(db, function () {
            db.close();
            res.send('done');
            res.end();
        }, {login: data.login}, {$push: {report: req.session.login}}, 'user');
    });
};

exports.bloquer_profile = function(data, req, res) {
    // Use connect method to connect to the Server
    if (req.session.login) {
        Mongo.Client.connect(Mongo.url, function (err, db) {
            Mongo.assert.equal(null, err);
            Mongo.update(db, function () {
                db.close();
                res.send('done');
                res.end();
            }, {login: req.session.login}, {$push: {bloquer: data.login}}, 'user');
        });
    }
    else {
        res.send('no login');
        res.end();
    }
};

exports.suppr_profile_tag = function(data, req, res) {
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.update(db, function () {
            db.close();
            res.send('done');
            res.end();
        }, {login : req.session.login}, {$pull: data}, 'user');
    });
};

exports.photo_suppr = function(data, req, res) {
     // Use connect method to connect to the Server
     Mongo.Client.connect(Mongo.url, function(err, db) {
     Mongo.assert.equal(null, err);
         Mongo.update(db, function () {
             db.close();
             res.send('done');
             res.end();
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
            res.end();
        }, {login : req.session.login}, {$set: data}, 'user');
    });
};

exports.is_it_blocked = function(data, req, res) {
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function (err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (docs) {
            Mongo.find(db, function (doc) {
                db.close();
                if (doc[0].bloquer) {
                    if (doc[0].bloquer.indexOf(docs[0].login) !== -1) {
                        res.send('yes');
                        res.end();
                    }
                    else
                    {
                        res.send('no');
                        res.end();
                    }
                }
                else
                {
                    res.send('no');
                    res.end();
                }
            }, {'login': data.login}, 'user');
        }, {'login': req.session.login}, 'user');
    });
};

exports.show_profile = function(username, req, res) {
    var profile_like = "no";
    var profile_match = "no";
    var find = 0;
    // Use connect method to connect to the Server
    // permet d'indiquer que la personne a visiter le profil
    if (req.session.login) {
        add_popularity(username, 10);
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
                Mongo.find(db, function (doc) {
                    db.close();
                    if (docs[0]) {
                        if (doc[0].bloquer) {
                            if (doc[0].bloquer.indexOf(docs[0].login) !== -1) {
                                find = 1;
                            }
                        }
                        if (find == 0) {
                            if (docs[0].match) {
                                for (var j = 0, len2 = docs[0].match.length; j < len2; j++) {
                                    if (docs[0].match[j].login === username) {
                                        profile_match = "yes";
                                        break;
                                    }
                                }
                            }
                            if (profile_match == 'no') {
                                if (docs[0].like) {
                                    for (var i = 0, len = docs[0].like.length; i < len; i++) {
                                        if (docs[0].like[i].login === username) {
                                            profile_like = "yes";
                                            break;
                                        }
                                    }
                                }
                            }
                            var visiteur = {
                                visiteur: {
                                    login: req.session.login,
                                    date: date_today(),
                                    photo: docs[0].profile
                                }
                            };
                            Mongo.Client.connect(Mongo.url, function (err, db) {
                                Mongo.assert.equal(null, err);
                                Mongo.update(db, function () {
                                    db.close();
                                }, {login: username}, {$push: visiteur}, 'user');
                            });
                        }
                    }
                }, {'login': username}, 'user');
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
                    pop : docs[0].pop,
                    last_logged : docs[0].last_logged,
                    tag : docs[0].tag,
                    logged: docs[0].logged || '',
                    profile_like : profile_like,
                    profile_match : profile_match
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
    var matchs;
    if (req.session.login) {
        Mongo.Client.connect(Mongo.url, function(err, db) {
            Mongo.assert.equal(null, err);
            Mongo.find(db, function (docs) {
                if(docs) {
                    if(docs[0].url) {
                        Mongo.find(db, function (doc) {
                            if (doc) {
                                if (doc[0].bloquer) {
                                    if (doc[0].bloquer.indexOf(docs[0].login) !== -1) {
                                        find = 1;
                                    }
                                }
                                if (find == 0) {
                                    var i = 0;
                                    if (docs[0].like) {
                                        while (docs[0].like[i]) {
                                            if (docs[0].like[i].login == username.login) {
                                                matchs = {match: {login: req.session.login}};
                                                Mongo.update(db, function () {
                                                }, {login: username.login}, {$pull: matchs}, 'user');
                                                matchs = {match: {login: username.login}};
                                                Mongo.update(db, function () {
                                                }, {login: req.session.login}, {$pull: matchs}, 'user');
                                                match = 1;
                                                matchs = {
                                                    match: {
                                                        login: req.session.login,
                                                        date: date_today(),
                                                        photo: docs[0].profile
                                                    }
                                                };
                                                Mongo.update(db, function () {
                                                }, {login: username.login}, {$push: matchs}, 'user');
                                                matchs = {
                                                    match: {
                                                        login: username.login,
                                                        date: date_today(),
                                                        photo: doc[0].profile
                                                    }
                                                };
                                                Mongo.update(db, function () {
                                                }, {login: req.session.login}, {$push: matchs}, 'user');
                                                add_popularity(username.login, 100);
                                            }
                                            i++;
                                        }
                                    }
                                    if (doc[0].like) {
                                        i = 0;
                                        while (doc[0].like[i]) {
                                            if (doc[0].like[i].login == req.session.login) {
                                                add_popularity(username.login, -50);
                                                find = 1;
                                                like = {like: {login: req.session.login}};
                                                Mongo.update(db, function () {
                                                    db.close();
                                                    res.send('unlike');
                                                    res.end();
                                                }, {login: username.login}, {$pull: like}, 'user');
                                            }
                                            i++;
                                        }
                                    }
                                    if (find == 0) {
                                        add_popularity(username.login, 50);
                                        like = {
                                            like: {
                                                login: req.session.login,
                                                date: date_today(),
                                                photo: docs[0].profile
                                            }
                                        };
                                        Mongo.update(db, function () {
                                            db.close();
                                            if (match == 1) {
                                                res.send('match');
                                                res.end();
                                            }
                                            else {
                                                res.send('like');
                                                res.end();
                                            }
                                        }, {login: username.login}, {$push: like}, 'user');
                                    }
                                }
                                else
                                {
                                    res.end();
                                }
                            }
                        }, {'login': username.login}, 'user');
                    }
                }
            }, {'login': req.session.login}, 'user');
        });
    }
    else {
        res.send('no login');
        res.end();
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

function add_popularity(username, score) {
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (docs) {
            if(docs) {
                Mongo.update(db, function () {
                    db.close();
                }, {login : username}, {$set : {pop : docs[0].pop + score}}, 'user');
            }
        }, {login : username}, 'user');
    });
}



