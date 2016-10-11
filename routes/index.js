var express = require('express');
var router = express.Router();
var index = require('../private/index.js');
var profile = require('../private/profile.js');
var index_function = require('../private/socket_index.js');
var visites = require('../private/visites.js');
var match = require('../private/match.js');
var like = require('../private/like.js');
var chat = require('../private/chat.js');
var generate = require('../private/generate.js');


/* POST */

router.post('/login', function(req, res){
    console.log("/login");
    index_function.login(req.body, req, res);
});

router.post('/update_profile', function(req, res) {
    console.log("/update_profile");
    console.log(req.body);
    profile.update_profile(req.body, req, res);
});

router.post('/get_profile_data', function(req, res) {
    console.log("/get_profile_data");
    index_function.get_profile_data(req, res);
});

router.post('/logout', function(req, res) {
    console.log('/logout');
    index_function.logout(req, res);
});

router.post('/photo_add', function(req, res) {
    console.log("/photo_add");
    profile.photo_add(req, res);
});

router.post('/save_position', function(req, res) {
    console.log('/save_position');
    index_function.save_position(req.body, req, res);
});

router.post('/suppr_images', function(req, res) {
    console.log('/suppr_images');
    profile.photo_suppr(req.body, req, res);
});

router.post('/profile_picture', function(req, res) {
    console.log('/profile_picture');
    profile.photo_profile(req.body, req, res);
});

router.post('/like_profile', function(req, res) {
    console.log('/like_profile');
    profile.like_profile(req.body, req, res);
});

router.post('/report_profile', function(req, res) {
    console.log('/report_profile');
    profile.report_profile(req.body, req, res);
});

router.post('/bloquer_profile', function(req, res) {
    console.log('/bloquer_profile');
    profile.bloquer_profile(req.body, req, res);
});

router.post('/add_profile_tag', function(req, res) {
    console.log('/add_profile_tag');
    profile.add_profile_tag(req.body, req, res);
});

router.post('/suppr_profile_tag', function(req, res) {
    console.log('/suppr_profile_tag');
    profile.suppr_profile_tag(req.body, req, res);
});

router.post('/add_new_tag', function(req, res) {
    console.log('/add_new_tag');
    index_function.add_new_tag(req.body, req, res);
});

router.post('/add_message', function(req, res) {
    console.log('/add_message');
    chat.add_message(req.body, req, res);
});

router.post ('/forgot_password', function(req, res) {
    console.log('/forgot_password');
    index_function.forgot_password(req.body, req, res);
});

/* GET */
router.get('/', function(req, res) {
    console.log("/");
    index.renderIndex(req, res);
});

router.get('/profile', function(req, res) {
    console.log("/profile");
    profile.renderProfile(req, res);
});

router.get('/visites', function(req, res) {
    console.log('/visites');
    visites.renderVisites(req, res);
});

router.get('/match', function(req, res) {
    console.log('/match');
    match.renderMatch(req, res);
});

router.get('/like', function(req, res) {
    console.log('/like');
    like.renderLike(req, res);
});

router.get('/chat', function(req, res) {
    console.log('/chat');
    chat.renderChat(req, res);
});

router.get('/generate', function(req, res) {
    console.log('/generate');
    generate.generate(req, res);
});

router.get('/message/:id', function(req, res) {
    console.log('/message/:id');
    var username = req.params.id;
    chat.renderMessageChat(username, req, res);
});

router.get('/:username', function(req, res) {
    console.log('/:username');
    var username = req.params.username;
    
    if (username != 'favicon.ico' && username != 'undefined') {
        profile.show_profile(username, req, res);
    }
});

module.exports = router;