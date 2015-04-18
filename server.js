/**
 * Created by Namdascious on 2/24/2015.
 * Name:        server.js
 * Description: Server-side configuration & initialization for bitc.kitchen
 */
var express  = require('express');
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

app.use(cors());
app.use(express.static(__dirname + '/kitchen'));                                // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));                            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));                 // parse application/vnd.api+json as json
app.use(methodOverride());

app.use(cookieParser());
app.use(session({secret: 'mysecret'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});

//Configure passport for github
passport.use(new GithubStrategy({
        clientID: 'a77c6a4d35c60953a174',
        clientSecret: '5c5444b73bdd6ab9f3ca6aaadfa227355ce1f6f6',
        callbackURL: "http://localhost:3000/kitchen/auth/github/callback"       //DO NOT CHANGE!!!
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));


app.get('/kitchen/api/login', passport.authenticate('github'));

app.get('/kitchen/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

app.get('*', function(req, res) {
    res.sendFile('/index.html');
});


// listen
app.listen(3000);
console.log("App listening on port 3000");