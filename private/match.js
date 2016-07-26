var Mongo = require ('./mongodb.js');

exports.renderMatch= function(req,res,next)
{
    res.render('match');
    // chercher tous les visiteurs de moi même.
    // ils seront enregistrer dans user sur mon login comme les images j'imagine.
    // Use connect method to connect to the Server
    /*Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (docs) {
            if(docs) {
                console.log(docs);
                res.render('visites', {visiteur : docs[0].visiteur});
            }
            else {
                res.render('visites_error');
            }
        }, {'login': req.session.login}, 'user');
    });*/
};