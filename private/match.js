var Mongo = require ('./mongodb.js');

exports.renderMatch = function(req,res)
{
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (docs) {
            if(docs) {
                res.render('match', {match : docs[0].match});
            }
            else {
                res.render('match_error');
            }
        }, {'login': req.session.login}, 'user');
    });
};