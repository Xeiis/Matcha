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
                if (typeof(docs[0].chat.message) != 'undefined') {
                    while (docs[0].chat.message[i]) {
                        while (docs[0].chat.message[i].login[j] != username) {
                            j++
                        }
                        if (docs[0].chat.message[i].login[j] == username)
                            res.render('messagechat', {chat: docs[0].chat.message[i], login: req.session.login});
                        i++;
                    }
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

/*var chat = {chat : [ {message : [ {login : username.login, text: ''} ] } ] };
 Mongo.update(db, function () {
 }, {login: req.session.login}, {$push: chat}, 'user');
 var chat = {chat : [ {message : [{login : req.session.login, text: ''} ] } ] };
 Mongo.update(db, function () {
 }, {login: username.login}, {$push: chat}, 'user');*/

exports.add_message = function(data, req, res)
{
    var chat = {chat : [ {message : [ {login : req.session.login, text: data.message} ] } ] };
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        Mongo.update(db, function () {
        }, {login: req.session.login}, {$push: chat}, 'user');
        Mongo.update(db, function () {
        }, {login: data.username}, {$push: chat}, 'user');
        db.close();
        res.send('done');
    });
};