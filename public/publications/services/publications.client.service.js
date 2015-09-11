angular.module('publications').factory('Publications', ['$resource',
    function($resource) {
        return $resource('api/publications/:publicationId', {
            publicationId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]).factory('faceSocket', function (socketFactory) {
  	return socketFactory();
}).factory('notification', function () {
     var notifResponse = {};
     console.log("+++++++++++++++++++");
     return {
        saveNotifResponse: function (publication) {
        	console.log("=================================");
        	notifResponse = publication;
        	console.log(publication);
        },
        getNotifResponse: function () {
        	console.log("888888888888888888888888888888");
        	if(notifResponse){
        		console.log(notifResponse);
        	return notifResponse;
        }
        }
    };
});