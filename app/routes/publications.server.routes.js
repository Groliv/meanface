var users = require('../../app/controllers/users.server.controller');
var publications = require('../../app/controllers/publications.server.controller');

console.log(users.requiresLogin);

module.exports = function(app) {
	app.route('/api/publications')
        .get(publications.list)
        .post(users.requiresLogin, publications.create);

    app.route('/api/publications/:publicationId')
        .get(publications.read)
        .put(users.requiresLogin, publications.hasAuthorization, publications.update)
        .delete(users.requiresLogin, publications.hasAuthorization, publications.delete);

    app.param('publicationId', publications.publicationByID);
};