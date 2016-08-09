var passwordHash = require('password-hash');

exports.generate = function(req, res) {
    var data_inscription = {login:'123', password:'123', email:'seis02@hotmail.fr', nom:'123', prenom:'123'};
    var data_profile = {nom:'Damien', prenom:'Christophe', email:'seis02@hotmail.fr', ville:'Paris', cp:'75017', date:'1993-02-23', attirance:'F', sexe:'H', description:'Je suis un mec qui cherche une fille', login:'123'};
    var data_photo = {profile: 'images/123.jpg' };
    inscription(data_inscription, data_profile, update_profile);
    photo_profile(data_photo, '123');
    data_inscription = {login:'456', password:'456', email:'seis02@hotmail.fr', nom:'456', prenom:'456'};
    data_profile = {nom:'Julie', prenom:'Le maire', email:'seis02@hotmail.fr', ville:'Paris', cp:'75015', date:'1993-02-23', attirance:'H', sexe:'F', description:'Je suis une fille qui cherche une mec', login:'456'};
    data_photo = {profile: 'images/456.jpg' };
    inscription(data_inscription, data_profile, update_profile);
    photo_profile(data_photo, '456');
    data_inscription = {login:'789', password:'789', email:'seis02@hotmail.fr', nom:'789', prenom:'789'};
    data_profile = {nom:'Trans', prenom:'Hehe', email:'seis02@hotmail.fr', ville:'Paris', cp:'75008', date:'1990-09-28', attirance:'HF', sexe:'A', description:'Je suis une trans qui recherche de tout', login:'789'};
    data_photo = {profile: 'images/789.jpg' };
    inscription(data_inscription, data_profile, update_profile);
    photo_profile(data_photo, '789');
    data_inscription = {login:'147', password:'147', email:'seis02@hotmail.fr', nom:'147', prenom:'147'};
    data_profile = {nom:'Marie', prenom:'Desinz', email:'seis02@hotmail.fr', ville:'Paris', cp:'75020', date:'1994-02-14', attirance:'HF', sexe:'F', description:'Je suis une femme qui suis attirer par les hommes et les femmes.', login:'147'};
    data_photo = {profile: 'images/147.jpg' };
    inscription(data_inscription, data_profile, update_profile);
    photo_profile(data_photo, '147');
    data_inscription = {login:'258', password:'258', email:'seis02@hotmail.fr', nom:'258', prenom:'258'};
    data_profile = {nom:'Pierre', prenom:'DePierre', email:'seis02@hotmail.fr', ville:'Paris', cp:'75019', date:'1992-06-21', attirance:'HF', sexe:'H', description:'Je suis un homme qui aime les femmes et les hommes', login:'258'};
    data_photo = {profile: 'images/258.jpg' };
    inscription(data_inscription, data_profile, update_profile);
    photo_profile(data_photo, '258');
    res.send('done');
};

inscription = function(data_x,data_y, callback) {
    // Use connect method to connect to the Server
    data.password = passwordHash.generate(data.password);
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.insertOne(db, function () {
            db.close();
            callback(data_y);
        }, data_x, 'user');
    });
};

update_profile = function(data) {
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.update(db, function () {
            db.close();
        }, {login: req.session.login}, {$set: data}, 'user');
    });
};

photo_profile = function(data, login) {
    console.log(data);
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.update(db, function () {
            db.close();
        }, {login : login}, {$set: data}, 'user');
    });
};
