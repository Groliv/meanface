angular.module('users').controller('UsersController', ['$scope', '$routeParams', '$location', '$remember', 'Authentication', 'Users', 'Publications',
    function($scope, $routeParams, $location, $remember, Authentication, Users, Publications) {
        $scope.authentication = Authentication;
        $scope.stayLoggedIn = true;
        $scope.mypublications = [];

        $scope.find = function() {
            $scope.users = Users.query();
        };

        $scope.findOne = function() {
            $scope.user = Users.get({
                userId: $routeParams.userId
            }, function(){
                if($scope.user)
                {
                    var mps = Publications.query();

                    for (var i = mps.length - 1; i >= 0; i--) {
                        if(mps[i]['author'] === $scope.user)
                        $scope.mypublications.push(mps[i]);
                    }
                    console.log($scope.mypublications);
                    return  $scope.mypublications;
                }
                else
                    $scope.error = errorResponse.data.message;
            });
        };

        $scope.update = function() {
            $scope.user.$update(function() {
                $location.path('userf/' + $scope.user._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.setAdmin = function(){
            $scope.user.admin = true;
            $scope.update();
        };

        $scope.delete = function(user) {
            if (user) {
                user.$remove(function() {
                    for (var i in $scope.users) {
                        if ($scope.users[i] === user) {
                            $scope.users.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.user.$remove(function() {
                    $location.path('users');
                });
            }
        };

        
    }
]);