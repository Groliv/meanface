angular.module('users').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/users', {
            templateUrl: 'userf/views/list-users.client.view.html'
        }).
        when('/users/:userId', {
            templateUrl: 'userf/views/view-user.client.view.html'
        }).
        when('/users/:userId/edit', {
            templateUrl: 'userf/views/edit-user.client.view.html'
        }).
        when('/users/:userId/infos', {
            templateUrl: 'userf/views/info-user.client.view.html'
        });
    }
]);