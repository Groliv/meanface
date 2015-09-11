angular.module('publications').controller('PublicationsController', ['$scope', '$routeParams', '$location', 'Authentication', 'Publications','faceSocket', 'notification',  'Flash',
    function($scope, $routeParams, $location, Authentication, Publications, FaceSocket, Notification, Flash) {
        $scope.authentication = Authentication;
        $scope.publinotifs = [];
        $scope.entete = "";
        var notification = Notification;
        var socket = FaceSocket;

        $scope.create = function() {
            var publication = new Publications({
                title: this.title,
                content: this.content
            });

            publication.$save(function(response) {
                Flash.create('success', "Publication successfully registered", 'custom-class');
                $location.path('publications/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
                Flash.create('danger', errorResponse.data.message, 'custom-class');
            });
        };

        $scope.find = function() {
            $scope.publications = Publications.query();
        };

        $scope.findOne = function() {
            $scope.publication = Publications.get({
                publicationId: $routeParams.publicationId
            });
        };

        $scope.update = function() {
            $scope.publication.$update(function() {
                $location.path('publications/' + $scope.publication._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.delete = function(publication) {
            if (publication) {
                publication.$remove(function() {
                    for (var i in $scope.publications) {
                        if ($scope.publications[i] === publication) {
                            $scope.publications.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.publication.$remove(function() {
                    $location.path('publications');
                });
            }
        };

        socket.on('publication.created', function(publication) {
            notification.saveNotifResponse(publication);
            console.log("7777777777777777777777777");
            //$scope.publinotifs.push("new publication to read");
            //console.log($scope.publinotifs);
            function resultController ($scope, notification) {
               //console.log(notification.getNotifResponse);
               var x = notification.getNotifResponse();
                $scope.publinotifs.unshift(x);
                console.log($scope.publinotifs);
            }
            $scope.entete = "Publication created : ";
            var n = resultController($scope, notification);
            return  $scope.publinotifs;
        });

        socket.on('publication.updated', function(publication) {
            notification.saveNotifResponse(publication);
            console.log("7777777777777777777777777");
            //$scope.publinotifs.push("new publication to read");
            //console.log($scope.publinotifs);
            function resultController ($scope, notification) {
               //console.log(notification.getNotifResponse);
               var x = notification.getNotifResponse();
                $scope.publinotifs.unshift(x);
                console.log($scope.publinotifs);
            }
            $scope.entete = "Publication updated : ";
            var n = resultController($scope, notification);
            return  $scope.publinotifs;
        });

        socket.on('publication.deleted', function(publication) {
            notification.saveNotifResponse(publication);
            console.log("7777777777777777777777777");
            //$scope.publinotifs.push("new publication to read");
            //console.log($scope.publinotifs);
            function resultController ($scope, notification) {
               //console.log(notification.getNotifResponse);
               var x = notification.getNotifResponse();
                $scope.publinotifs.unshift(x);
                console.log($scope.publinotifs);
            }
            $scope.entete = "Publication deleted : ";
            var n = resultController($scope, notification);
            return  $scope.publinotifs;
        });

    }
]);