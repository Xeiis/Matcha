var Mongo = require ('./mongodb.js');

exports.renderProfile = function(req,res,next)
{
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        console.log("Connected correctly to server");
        Mongo.find(db, function (docs) {
            db.close();
            if(docs[0]) {
                res.render('profile', {nom: docs[0].nom || '', prenom: docs[0].prenom || '', email: docs[0].email || '', ville: docs[0].ville || '', cp: docs[0].cp || '', date: docs[0].date || '', attirance: docs[0].attirance || '', sexe: docs[0].sexe || '', description: docs[0].decsription || '', login: docs[0].login || ''});
            }
        }, {'login': req.session.login}, 'user');
    });
};

exports.update_profile = function(data, req, res)
{
    console.log(data);
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        console.log("Connected correctly to server");
        Mongo.update(db, function () {
            db.close();
            res.send('done');
        }, {login :req.session.login},  {$set: data}, 'user');
    });
};