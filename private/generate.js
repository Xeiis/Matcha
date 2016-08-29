var Mongo = require ('./mongodb.js');
var passwordHash = require('password-hash');

exports.generate = function(req, res) {
    var data_inscription = {login:'123', password:'123', email:'seis02@hotmail.fr', nom:'123', prenom:'123'};
    var data_profile = {nom:'Christophe', prenom:'Damien', email:'seis02@hotmail.fr', ville:'Paris', cp:'75017', latitude: '48.857575', longitude: '2.296517', date:'1993-02-23', attirance:'F', sexe:'H', description:'Je suis un mec qui cherche une fille', login:'123'};
    var data_photo = {profile: 'images/123.jpg' };
    inscription(data_inscription, data_profile, '123', update_profile);
    photo_profile(data_photo, '123');
    data_inscription = {login:'456', password:'456', email:'seis02@hotmail.fr', nom:'456', prenom:'456'};
    data_profile = {nom:'Le maire', prenom:'Julie', email:'seis02@hotmail.fr', ville:'Paris', cp:'75015', latitude: '48.856564', longitude: '2.312678', date:'1993-02-23', attirance:'H', sexe:'F', description:'Je suis une fille qui cherche une mec', login:'456'};
    data_photo = {profile: 'images/456.jpg' };
    inscription(data_inscription, data_profile, '456', update_profile);
    photo_profile(data_photo, '456');
    data_inscription = {login:'789', password:'789', email:'seis02@hotmail.fr', nom:'789', prenom:'789'};
    data_profile = {nom:'Madelaine', prenom:'Trans', email:'seis02@hotmail.fr', ville:'Paris', cp:'75008', latitude: '48.896404', longitude: '2.318787', date:'1990-09-28', attirance:'HF', sexe:'A', description:'Je suis une trans qui recherche de tout', login:'789'};
    data_photo = {profile: 'images/789.jpg' };
    inscription(data_inscription, data_profile, '789', update_profile);
    photo_profile(data_photo, '789');
    data_inscription = {login:'147', password:'147', email:'seis02@hotmail.fr', nom:'147', prenom:'147'};
    data_profile = {nom:'Desinz', prenom:'Marie', email:'seis02@hotmail.fr', ville:'Paris', cp:'75020', latitude: '48.892793', longitude: '2.390141', date:'1994-02-14', attirance:'HF', sexe:'F', description:'Je suis une femme qui suis attirer par les hommes et les femmes.', login:'147'};
    data_photo = {profile: 'images/147.jpg' };
    inscription(data_inscription, data_profile, '147', update_profile);
    photo_profile(data_photo, '147');
    data_inscription = {login:'258', password:'258', email:'seis02@hotmail.fr', nom:'258', prenom:'258'};
    data_profile = {nom:'Depierre', prenom:'Pierre', email:'seis02@hotmail.fr', ville:'Paris', cp:'75019', latitude: '48.838092', longitude: '2.326825', date:'1992-06-21', attirance:'HF', sexe:'H', description:'Je suis un homme qui aime les femmes et les hommes', login:'258'};
    data_photo = {profile: 'images/258.jpg' };
    inscription(data_inscription, data_profile, '258', update_profile);
    photo_profile(data_photo, '258');
    var tague = {tag: 'Intello'};
    tag(tague);
    tague = {tag: 'Geek'};
    tag(tague);
    tague = {tag: 'Artiste'};
    tag(tague);
    tague = {tag: 'Roux(sse)'};
    tag(tague);
    tague = {tag: 'Brun(ne)'};
    tag(tague);
    tague = {tag: 'Blond(e)'};
    tag(tague);
    tague = {tag: 'Paris'};
    tag(tague);
    tague = {tag: 'Ibiza'};
    tag(tague);
    tague = {tag: 'Motard'};
    tag(tague);
    tague = {tag: 'Apple'};
    tag(tague);
    tague = {tag: 'Samsung'};
    tag(tague);
    tague = {tag: 'Chic'};
    tag(tague);
    tague = {tag: 'BCBG'};
    tag(tague);
    tague = {tag: 'Bohème'};
    tag(tague);
    tague = {tag: 'Cheveux_long'};
    tag(tague);
    tague = {tag: 'Yeux_bleus'};
    tag(tague);
    tague = {tag: 'Tatouages'};
    tag(tague);
    tague = {tag: 'Barbes'};
    tag(tague);
    tague = {tag: 'Imberbes'};
    tag(tague);
    tague = {tag: 'Globetrotteur'};
    tag(tague);
    tague = {tag: 'Fétard'};
    tag(tague);
    tague = {tag: 'Fumeur'};
    tag(tague);
    tague = {tag: 'Patchnicotine'};
    tag(tague);
    tague = {tag: 'Milf'};
    tag(tague);
    tague = {tag: 'Money'};
    tag(tague);
    tague = {tag: 'Beurette'};
    tag(tague);
    tague = {tag: 'Teen'};
    tag(tague);
    tague = {tag: 'Non_Fumeur(se)'};
    tag(tague);
    res.send('Les comptes et tag ont bien été crées.');
};

tag = function(tag){
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.insertOne(db, function () {
            db.close();
        }, tag, 'tag');
    });
};

inscription = function(data_x, data_y, login, callback) {
    // Use connect method to connect to the Server
    data_x.password = passwordHash.generate(data_x.password);
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.insertOne(db, function () {
            db.close();
            callback(data_y, login);
        }, data_x, 'user');
    });
};

update_profile = function(data, login) {
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.update(db, function () {
            db.close();
            console.log('compte update');
        }, {login: login}, {$set: data}, 'user');
    });
};

photo_profile = function(data, login) {
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.update(db, function () {
            db.close();
            console.log('compte photo profile update');
        }, {login : login}, {$set: data}, 'user');
    });
};
