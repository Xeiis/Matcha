var Mongo = require ('./mongodb.js');

exports.renderVisites = function(req,res,next)
{
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (docs) {
            if(docs) {
                res.render('visites', {visiteur : docs[0].visiteur});
            }
            else {
                res.render('visites_error');
            }
        }, {'login': req.session.login}, 'user');
    });
};