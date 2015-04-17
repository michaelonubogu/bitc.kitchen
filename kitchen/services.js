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
    });
