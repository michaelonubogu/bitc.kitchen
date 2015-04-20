/**
 * Created by Namdascious on 3/31/2015.
 */

angular.module('kitchen')

    /*==========================================================================
     App Controller -- Top Level Controller.
     ==========================================================================*/
    .controller('AppController', ['$scope', '$http', function ($scope, $http) {

        /* registers a script block to the DOM. Called in 1st level nested app controllers using $scope.$parent.loadScript()*/
        $scope.loadScript = function(url, type, charset, override){
            if(type === undefined) type = 'text/javascript';

            if(url){
                var script = document.querySelector("script[src*='" + url + "']");
                if(!script || override){
                    var heads = document.getElementsByTagName("head");
                    if(heads && heads.length){
                        var head = heads[0];
                        if(head){
                            script = document.createElement('script');
                            script.setAttribute('src', url);
                            script.setAttribute('type', type);
                            if(charset) script.setAttribute('charset', charset);
                            head.appendChild(script);
                        }
                    }
                }
                return script;
            }
        };
    }])

    /*==========================================================================
     Home Controller
     ==========================================================================*/
    .controller('HomeController', ['$scope', '$http', function ($scope, $http) {
    }])

    /*==========================================================================
     Landing Page Controller
     ==========================================================================*/
    .controller('LoginController', ['$scope', '$http', 'localStorageFactory', 'kitchenAPI', function ($scope, $http, localStorageFactory, kitchenAPI) {

        $scope.githubLogin = function(){
            kitchenAPI.loginToGithub()
                .success(function(data, status, headers){
                    window.alert('SUCCESS');
                })
                .error(function(){

                });
        };

        $scope.init = function(){

        };

        $scope.init();
    }])

    /*==========================================================================
     Content Panel Controller
     ==========================================================================*/
    .controller('ContentPanelController', ['$scope', '$http', '$location', 'kitchenUtils', '_', function ($scope, $http, $location, kitchenUtils,  _) {

    }])

    /*==========================================================================
     Workspace Controller
     ==========================================================================*/
    .controller('WorkspaceController', ['$scope', '$http', function ($scope, $http) {
        //Load scripts
        $scope.$parent.loadScript('components/materialize/js/materialize.min.js');
        $scope.$parent.loadScript('scripts/workspace.js');

        $scope.actionNames = {
            run: 'run',
            folder: 'folder',
            collaborate:'collaborate',
            libraries: 'libraries',
            stats: 'stats',
            settings: 'settings'
        };

        $scope.actions = {
            run: { url: '../partials/kitchen-debug.html', selected: false },
            folder: { url: '', selected: false },
            collaborate: { url: '', selected : false },
            libraries: { url: '../partials/add-library.html', selected : false },
            stats: { url: '', selected : false },
            settings : { url: '', selected : false}
        };

        $scope.setContentPanel = function(action_name){
            _.each($scope.actions, function(action){
                action.selected = false;
            });

            var selected_action = _.findWhere($scope.actions, function(action){
                return action.name === action_name;
            });

            if(!kitchenUtils.isNullOrUndefined(selected_action)){
            }
        };

        $scope.deselectActions = function(){
            $scope.actions.run.selected = false;
            $scope.actions.folder.selected = false;
            $scope.actions.collaborate.selected = false;
            $scope.actions.libraries.selected = false;
            $scope.actions.stats.selected = false;
            $scope.actions.settings.selected = false;
        };

        $scope.setAction = function(action){
            $scope.deselectActions();
            action.selected = true;
            $scope.contentPanelUrl = action.url;
        };

        $scope.init = function(){
            $scope.actions.libraries.selected = true;
            $scope.contentPanelUrl = $scope.actions.libraries.url;
        };

        $scope.init();
    }])

    /*==========================================================================
     Library Controller
     ==========================================================================*/
    .controller('LibraryController', ['$scope', '$http', function ($scope, $http) {
    }])

    /*==========================================================================
     Settings Controller
     ==========================================================================*/
    .controller('SettingsController', ['$scope', '$http', function ($scope, $http) {
    }])

