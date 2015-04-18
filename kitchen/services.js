/**
 * Created by Namdascious on 4/1/2015.
 */

angular.module('kitchen')

    .factory('localStorageFactory', function(){

        var kitchen_service = {};

        kitchen_service.getItem = function(key){
        };

        kitchen_service.addItem = function(key, value){
        }

        return kitchen_service;
    })

    .factory('_', function(){
        return window._;
    })

    .factory('kitchenUtils', function(){
        return {
            isNullOrUndefined : function(value){
                return (value === null || value === undefined);
            }
        }
    })

    .factory('kitchenAPI', function($http){

        var apiUrl = 'http://localhost:3000/kitchen/api/';
        var api = {
            login: apiUrl + 'login'
        };

        return {
            loginToGithub: function(){
                return $http.get(api.login);
            }
        }
    });
