var express = require('express');
var router = express.Router();
var index = require('../private/index.js');
var profile = require('../private/profile.js');
var index_function = require('../private/socket_index.js');

/* GET home page. */
router.get('/', function(req, res) {
    console.log("/");
    index.renderIndex(req, res);
});

router.get('/profile', function(req, res, next) {
    console.log("/profile");
    profile.renderProfile(req, res, next);
});

router.post('/login', function(req, res){
    console.log("/login");
    index_function.login(req.body, req, res);
});

router.post('/update_profile', function(req, res){
    console.log("/update_profile");
    console.log(req.body);
    profile.update_profile(req.body, req, res);
});

router.post('/get_profile_data', function(req, res){
    console.log("/get_profile_data");
    index_function.get_profile_data(req, res);
});

router.post('/logout', function(req, res){
    console.log('/logout');
    req.session.destroy();
    res.send('Done');
});

router.post('/photo_add', function(req, res){
    console.log("/photo_add");
    var data = new Object();

    data.url = req.file.path.substring(req.file.path.indexOf('/') + 1);
    profile.photo_add(data, req, res);
});

router.post('/save_position', function(req, res){
    console.log('/save_position');
    index_function.save_position(req.body, req, res);
});

router.post('/suppr_images', function(req, res){
    console.log('/suppr_images');
    profile.photo_suppr(req.body, req, res);
});

router.post('/profile_picture', function(req, res){
    console.log('/profile_picture');
    profile.photo_profile(req.body, req, res);
});

router.get('/:username', function(req, res){
    console.log('/:username');
    var username = req.params.username;
    if (username != 'favicon.ico') {
        profile.show_profile(username, req, res);
    }
    else
        res.end();
});

module.exports = router;