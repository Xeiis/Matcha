exports.renderIndex = function(req,res,next)
{
    req.session.uid = Date.now();
    req.session.login = 'no one';
    res.render('index', '');
};