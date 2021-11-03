var testApp = angular.module('testApp', [
    'ngAnimate',
    'ngRoute',
    'productSection',
    'notFoundPage',
    'topBar'
]);

testApp.config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider.
            when('/', {
                template: '<product-section></product-section>',
                
            }).
            when('/notfoundpage', {
                template: '<not-found-page></not-found-page>'
            }).
            otherwise('/notfoundpage');
    }
]);