exports.render = function(req, res) {
    res.render('index', {
    	title: 'Book my Face',
    	user: JSON.stringify(req.user)
    });
};