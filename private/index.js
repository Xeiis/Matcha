var Mongo = require ('./mongodb.js');

exports.renderIndex = function(req, res)
{
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (doc) {
            if (doc) {
                var tags = {};
                var i = 0;
                while (doc[i]) {
                    tags[i] = doc[i].tag;
                    i++;
                }
            }
            if (req.session.login)
                res.render('index', {tags: tags,login : true});
            else
                res.render('index', {tags: tags,login : false});
            db.close();
        }, {}, 'tag')
    });
};