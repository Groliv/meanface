var appName = 'meanface';

var app = angular.module(appName, ['ngResource', 'ngRoute', 'example', 'users', 'publications','btford.socket-io', 'flash']);

app.config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

//Correstion of facebook redirection bug
if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function() {
    angular.bootstrap(document, [appName]);
});