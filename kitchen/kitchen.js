/**
 * Created by Namdascious on 4/15/2015.
 */

var app = angular.module('kitchen', ['ngRoute']);

app.config(function ($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

    $routeProvider
        .when('/home', {templateUrl: 'views/home.html', controller: 'HomeController'})
        .when('/login', {templateUrl: 'views/login.html', controller: 'LoginController'})
        .when('/workspace', { templateUrl: 'views/workspace.html', controller: 'WorkspaceController' })
        .when('/workspace/:id', { templateUrl: 'views/workspace.html', controller: 'WorkspaceController' })
        .otherwise({ redirectTo: '/login' });
})

    .run(['$rootScope', function($rootScope){
        $rootScope.$on('$locationChangeStart', function(e, next, current){

        })
    }]);

