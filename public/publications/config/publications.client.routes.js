angular.module('publications').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/publications', {
            templateUrl: 'publications/views/list-publications.client.view.html'
        }).
        when('/publications/create', {
            templateUrl: 'publications/views/create-publication.client.view.html'
        }).
        when('/publications/:publicationId', {
            templateUrl: 'publications/views/view-publication.client.view.html'
        }).
        when('/publications/:publicationId/edit', {
            templateUrl: 'publications/views/edit-publication.client.view.html'
        });
    }
]);