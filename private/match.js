var Mongo = require ('./mongodb.js');

exports.renderMatch= function(req,res,next)
{
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (docs) {
            if(docs) {
                console.log(docs[0].match);
                res.render('match', {match : docs[0].match});
            }
            else {
                res.render('match_error');
            }
        }, {'login': req.session.login}, 'user');
    });
};