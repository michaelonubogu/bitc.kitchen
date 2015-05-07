/**
 * Created by Namdascious on 3/31/2015.
 */

angular.module('kitchen')

    /*==========================================================================
     App Controller -- Top Level Controller.
     ==========================================================================*/
    .controller('AppController', ['$scope', '$http', '$q', function ($scope, $http, $q) {

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

        $scope.loadScriptAsync = function(url, type, charset, override){
            return $q(function(resolve, reject){
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

                                //resolve
                                resolve();
                            }
                        }
                    }
                    return script;
                }
            });
        }
    }])

    /*==========================================================================
     Home Controller
     ==========================================================================*/
    .controller('HomeController', ['$scope', '$http', function ($scope, $http) {
    }])

    /*==========================================================================
     Login Page Controller
     ==========================================================================*/
    .controller('LoginController', ['$scope', '$http', '$location', '$interval', 'kitchenAPI', function ($scope, $http, $location, $interval, kitchenAPI) {

        $scope.githubLogin = function(){
            var popupWindow = window.open('https://github.com/login/oauth/authorize?client_id=a77c6a4d35c60953a174', '', 'width=800, height=600');
            var checkLoginStatus = $interval(function(){
                if(!popupWindow || !popupWindow.closed) return;
                clearInterval(checkLoginStatus);
                $location.path('/repobrowser');
            }, 100);
        };

        $scope.init = function(){

        };

        $scope.init();
    }])

    /*==========================================================================
     Dashboard Controller
     ==========================================================================*/
    .controller('DashboardController', ['$scope', '$http', '$location', 'kitchenAPI', function ($scope, $http, $location, kitchenAPI) {

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
     RepoBrowser Controller
     ==========================================================================*/
    .controller('RepoBrowserController', ['$scope', '$http', '_', 'kitchenUtils', function ($scope, $http, _, kitchenUtils) {
        $scope.$parent.loadScript('components/materialize/js/materialize.min.js');
        $scope.githubManager = {};
        $scope.githubUser = {};
        $scope.selectedRepos = [];
        $scope.userRepos = [];
        $scope.orgRepos = []; //{ login: '', repos: []}
        $scope.userOrgs = [];
        $scope.selectedContext = {
            selected: '',
            login: ''
        };
        $scope.contextType = {
            user: 'user',
            org: 'org'
        };

        $scope.browseRepo = function(){

        };

        $scope.switchContext = function(selected, type){
            if(selected !== $scope.selectedContext.selected){

                $scope.selectedContext.login = selected;

                //show repos associated with selected context
                if(type === $scope.contextType.user){
                    $scope.selectedRepos = $scope.userRepos;
                    $scope.selectedContext.selected = $scope.contextType.user;
                }
                else{
                    //check to see if we have pulled org repo b4
                    var repo = _.findWhere($scope.orgRepos, function(orgRepo){
                        return orgRepo.login == selected;
                    });

                    if(!kitchenUtils.isNullOrUndefined(repo)){
                        $scope.selectedRepos = repo.repos;
                        $scope.$apply();
                    }
                    else{
                        $scope.githubManager.getOrgRepos(selected).then(function(repos){
                            $scope.selectedRepos = repos;
                            $scope.orgRepos.push({ login: selected, repos: repos});
                            $scope.selectedContext.selected = $scope.contextType.org;
                            $scope.$apply();
                        });
                    }
                    $scope.selectedContext.selected = $scope.contextType.org;
                }
            }
        };

        $scope.init = function(){
            var githubManager = new window.GithubManager();

            githubManager.getUser().then(function(user){
                $scope.githubUser = user;
                $scope.selectedContext.login = $scope.githubUser.login;
                $scope.$apply();
            });

            //orgs
            githubManager.getUserOrgs().then(function(orgs){
                $scope.userOrgs = orgs;
                $scope.$apply();
            });

            //repos
            githubManager.getUserRepos().then(function(repos){
                $scope.selectedRepos = repos;
                $scope.userRepos = repos; //on init, we get the user repos by default
                $scope.selectedContext.selected = $scope.contextType.user;
                $scope.$apply();
                $scope.$parent.loadScript('scripts/repobrowser.js');
            });

            $scope.githubManager = githubManager;
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

