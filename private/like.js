var Mongo = require ('./mongodb.js');

exports.renderLike = function(req,res)
{
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (docs) {
            if(docs) {
                res.render('like', {like : docs[0].like});
            }
            else {
                res.render('like_error');
            }
        }, {'login': req.session.login}, 'user');
    });
};