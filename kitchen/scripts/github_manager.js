/**
 * Created by Namdascious on 4/21/2015.
 */
(function(){

    var GithubManager = function(){

        var clientid;
        var access_token = localStorage.getItem('github_access_token');
        if(!access_token || access_token === null || access_token === undefined) {
            window.alert("We couldn't get your Github info. Sorry :( ...");
            return;
        }
        var github = new Github({
            token: access_token,
            auth: "oauth"
        });

        var user = github.getUser();

        this.getUser = function(){
            return new WinJS.Promise(function(completeDispatch, errorDispatch, progressDispatch){
                user.authenticatedUser(function(err, user) {
                    if(user !== null && user !== undefined){
                        /* do some stuff - process returned repos for consumption...*/
                        completeDispatch(user);
                    }
                    else{
                        var error = new WinJS.ErrorFromName('Authenticated User Error', 'Could not pull authenticated user');
                        errorDispatch(error);
                    }
                });
            });
        };

        this.getUserRepos = function(){
            return new WinJS.Promise(function(completeDispatch, errorDispatch, progressDispatch){
                user.repos(function(err, repos) {
                    if(repos !== null && repos !== undefined){
                        /* do some stuff - process returned repos for consumption...*/
                        completeDispatch(repos);
                    }
                    else{
                        var error = new WinJS.ErrorFromName('User Repo Error', 'Could not pull user repos');
                        errorDispatch(error);
                    }
                });
            });
        };

        this.getUserOrgs = function(){
            return new WinJS.Promise(function(completeDispatch, errorDispatch, progressDispatch){
                user.orgs(function(err, orgs) {
                    if(orgs !== null && orgs !== undefined){
                        /* do some stuff - process returned orgs for consumption...*/
                        completeDispatch(orgs);
                    }
                    else{
                        var error = new WinJS.ErrorFromName('User Orgs Error', 'Could not pull user orgs');
                        errorDispatch(error);
                    }
                });
            });
        };

        this.getUserGists = function(){
            return new WinJS.Promise(function(completeDispatch, errorDispatch, progressDispatch){
                user.gists(function(err, gists) {
                    if(gists !== null && gists !== undefined){
                        /* do some stuff - process returned gists for consumption...*/
                        completeDispatch(gists);
                    }
                    else{
                        var error = new WinJS.ErrorFromName('User Gists Error', 'Could not pull user gists');
                        errorDispatch(error);
                    }
                });
            });
        };

        this.getUserNotifications = function(){
            return new WinJS.Promise(function(completeDispatch, errorDispatch, progressDispatch){
                user.notifications(function(err, notifications) {
                    if(notifications !== null && notifications !== undefined){
                        /* do some stuff - process returned notifications for consumption...*/
                        completeDispatch(notifications);
                    }
                    else{
                        var error = new WinJS.ErrorFromName('User Notifications Error', 'Could not pull user notifications');
                        errorDispatch(error);
                    }
                });
            });
        };

        this.showInformation = function(name, type){
            return new WinJS.Promise(function(completeDispatch, errorDispatch, progressDispatch){
                user.show(name, function(err, entity) {
                    if(entity !== null && entity !== undefined){
                        /* do some stuff - process returned entity for consumption...*/
                        completeDispatch(entity);
                    }
                    else{
                        var error = new WinJS.ErrorFromName('User Entity Error', 'Could not pull user entity');
                        errorDispatch(error);
                    }
                });
            });
        };

        this.getPublicUserRepos = function(username){
            //List public repositories for a particular user.
            return new WinJS.Promise(function(completeDispatch, errorDispatch, progressDispatch){
                user.userRepos(username, function(err, repos) {
                    if(repos !== null && repos !== undefined){
                        /* do some stuff - process returned repos for consumption...*/
                        completeDispatch(repos);
                    }
                    else{
                        var error = new WinJS.ErrorFromName('User Public Repos Error', 'Could not pull user public repos');
                        errorDispatch(error);
                    }
                });
            });
        };

        this.createNewRepo = function(repoObject){
            /*
             * repoObject : {
             *      'name' : 'your-repo-name',
             *      'description' : 'your-repo-description',
             *      'homepage' : 'your-home-page',
             *      'private' : true/false,
             *      'has_issues' : true/false (will Mark find this easter egg he he :p),
             *      ...
             * }
             * Full list of properties found @ https://developer.github.com/v3/repos/#create
             */
            return new WinJS.Promise(function(completeDispatch, errorDispatch, progressDispatch){
                user.createRepo(repoObject, function(err, res) {
                    if(res !== null && res !== undefined){
                        /* do some stuff - process returned repos for consumption...*/
                        completeDispatch(res);
                    }
                    else{
                        var error = new WinJS.ErrorFromName('Create Repo', 'Could not create repo');
                        errorDispatch(error);
                    }
                });
            });
        };

        this.getGist = function(gistId){
            return new WinJS.Promise(function(completeDispatch, errorDispatch, progressDispatch){
                var gist = github.getGist(gistId);

                gist.read(function(err, gist) {
                    if(gist !== null && gist !== undefined){
                        /* do some stuff - process returned repos for consumption...*/
                        completeDispatch(gist);
                    }
                    else{
                        var error = new WinJS.ErrorFromName('Get Gists', 'Could not get gists');
                        errorDispatch(error);
                    }
                });
            });
        };

        this.getIssues = function(username, reponame){
            return new WinJS.Promise(function(completeDispatch, errorDispatch, progressDispatch){
                var gist = github.getIssues(gistId);

                gist.read(function(err, gist) {
                    if(gist !== null && gist !== undefined){
                        /* do some stuff - process returned repos for consumption...*/
                        completeDispatch(gist);
                    }
                    else{
                        var error = new WinJS.ErrorFromName('Get Gists', 'Could not get gists');
                        errorDispatch(error);
                    }
                });
            });
        };

        this.getOrgRepos = function(orgname){
            return new WinJS.Promise(function(completeDispatch, errorDispatch, progressDispatch){
                user.orgRepos(orgname, function(err, repos) {
                    if(repos !== null && repos !== undefined){
                        /* do some stuff - process returned repos for consumption...*/
                        completeDispatch(repos);
                    }
                    else{
                        var error = new WinJS.ErrorFromName('Get Org Repos', 'Could not get org repo');
                        errorDispatch(error);
                    }
                });
            });
        };
    };
    window.GithubManager = GithubManager;
}).call(this);