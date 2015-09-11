angular.module('users').factory('Authentication', [
    function() {
        this.user = window.user;
        return {
            user: this.user
        };
    }
]).factory('$remember', function() {
    return function(name, values) {
        var cookie = name + '=';      
        cookie += values + ';';
        var date = new Date();
        date.setDate(date.getDate() + 365);
        cookie += 'expires=' + date.toString() + ';';
        document.cookie = cookie;
    };
}).factory('$forget', function() {
    return function(name) {
        var cookie = name + '=;';
        cookie += 'expires=' + (new Date()).toString() + ';';
        document.cookie = cookie;
    };
});
