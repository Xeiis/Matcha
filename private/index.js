exports.renderIndex = function(req, res)
{
    if (req.session.login)
        res.render('index',{login : true});
    else
        res.render('index', {login : false});
};