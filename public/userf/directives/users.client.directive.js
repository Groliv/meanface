var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
};

var ngEquals = function(){
	return {
		restrict: 'A',
		require: 'ngModel',
		scope:true,
		link: function(scope, elem, attrs, ctrl){
			var formName=elem.parents("form").attr("name");
			scope.controller = ctrl;
			scope.equality = scope.$parent[formName][attrs.ngEquals];
			scope.$watch('[controller.$viewValue, equality.$viewValue]', function(newVal, oldVal){
				if(newVal[0] && newVal[1]){// && newVal[0].length >= attrs.minlength){
					ctrl.$setValidity('equals', newVal[0] === newVal[1]);
				}
			});
		}
	};
};

angular.module('users').directive("compareTo", compareTo);
angular.module('users').directive("ngEquals", ngEquals);