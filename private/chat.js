var Mongo = require ('./mongodb.js');

exports.renderChat = function(req,res)
{
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (docs) {
            if(docs) {
                res.render('chat', {match : docs[0].match, chat : docs[0].chat});
            }
            else {
                res.render('chat_error');
            }
        }, {'login': req.session.login}, 'user');
    });
};

exports.renderMessageChat = function(username, req, res)
{
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.find(db, function (docs) {
            if (docs) {
                var i = 0;
                var find = 0;
                if (typeof(docs[0].chat) != 'undefined') {
                    if (typeof(docs[0].chat[0]) != 'undefined') {
                        var chat =  [];
                        while (docs[0].chat[i]) {
                            var obj = {};
                            if (docs[0].chat[i].message.conversation == username+"-"+req.session.login || docs[0].chat[i].message.conversation == req.session.login+"-"+username)
                            {
                                find = 1;
                                obj.conv = {message : docs[0].chat[i].message.text, username : docs[0].chat[i].message.login, moi : req.session.login};
                                chat.push(obj.conv);
                            }
                            i++;
                        }
                        if (find == 1)
                            res.render('messagechat', {chat: chat, login: req.session.login});
                    }
                    else
                        res.render('messagechat', {chat: docs[0].chat, login: req.session.login});
                }
                else
                    res.render('messagechat', {chat: docs[0].chat, login: req.session.login});
            }
            else {
                res.render('messagechat_error');
            }
        }, {'login': req.session.login}, 'user');
    });
};

exports.add_message = function(data, req, res)
{
    add_popularity(data.username, 5);
    var chat = {chat : {message : {login : req.session.login, text: data.message, conversation : data.username+"-"+req.session.login} } };
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.update(db, function () {
        }, {login: req.session.login}, {$push: chat}, 'user');
        Mongo.update(db, function () {
        }, {login: data.username}, {$push: chat}, 'user');
        db.close();
        res.send('done');
        res.end();
    });
};

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