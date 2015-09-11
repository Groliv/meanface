angular.module('meanface', [])
    .factory('notification', function () {
        var notifResponse = {};

        return {
            saveNotifResponse:function (data) {
                notifResponse = data;
                console.log(data);
            },
            getNotifResponse:function () {
                return notifResponse;
            }
        };
    });