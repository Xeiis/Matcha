exports.renderIndex = function(req,res,next)
{
    req.session.uid = Date.now();
    res.render('index', {title: 'Express'});
};