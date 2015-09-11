var mongoose = require('mongoose'),
    Publication = mongoose.model('Publication');

var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.create = function(req, res) {
    var publication = new Publication(req.body);
    publication.author = req.user;
    publication.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
            socketio.sockets.emit('publication.created', publication); // emit an event for all connected clients
            res.json(publication);
        }
    });
};

exports.list = function(req, res) {
    Publication.find().sort('-created').populate('author', 'firstname username').exec(function(err, publications) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(publications);
        }
    });
};

exports.read = function(req, res) {
    res.json(req.publication);
};

exports.publicationByID = function(req, res, next, id) {
    Publication.findById(id).populate('author', 'firstname username').exec(function(err, publication) {
        if (err)
            return next(err);

        if (!publication)
            return next(new Error('Failed to load publication ' + id));

        req.publication = publication;
        next();
    });
};

exports.update = function(req, res) {
    var publication = req.publication;
    publication.title = req.body.title;
    publication.content = req.body.content;

    publication.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
            socketio.sockets.emit('publication.updated', publication); // emit an event for all connected clients
            res.json(publication);
        }
    });
};

exports.delete = function(req, res) {
    var publication = req.publication;
    publication.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
            socketio.sockets.emit('publication.deleted', publication); // emit an event for all connected clients
            res.json(publication);
        }
    });
};

exports.hasAuthorization = function(req, res, next) {
    if (req.publication.author.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};