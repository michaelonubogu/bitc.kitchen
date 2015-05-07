/**
 * Created by Namdascious on 2/24/2015.
 * Name:        server.js
 * Description: Server-side configuration & initialization for bitc.kitchen
 */
var express  = require('express');
var http = require('http');
var httpProxy = require('http-proxy');
var cors = require('cors');
var morgan = require('morgan');                     // log requests to the console (express4)
var bodyParser = require('body-parser');            // pull information from HTML POST (express4)
var methodOverride = require('method-override');    // simulate DELETE and PUT (express4)
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');

var github_authorize_url = 'https://github.com/login/oauth/authorize';

var allowCrossDomain = function(req, res, next){
    res.header('Access-Control-Allow-Origin', github_authorize_url);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
}

app.use(express.static(__dirname + '/kitchen'));                                // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));                            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));                 // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(allowCrossDomain);
app.use(cookieParser());
app.use(session({secret: 'mysecret'}));
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res) {
    res.sendFile('/index.html');
});


// listen
app.listen(3000);
console.log("App listening on port 3000");