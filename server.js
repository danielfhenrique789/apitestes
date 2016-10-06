#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('client-sessions');
var fs      = require('fs');
var os = require("os");
var hostname = os.hostname();

//MongoDb
if(hostname == "Mac-mini-de-Daniel.local"){
    mongoose.connect('mongodb://'+hostname+'/add_people',function(err){
        if(err){
          console.log("Erro ao conectar com MongoDb. Erro: "+err);
        }
    });
}
else{    
    console.log("Servidor");
    //mongoose.connect('mongodb://user:senha'+process.env.OPENSHIFT_MONGODB_DB_HOST+':'+process.env.OPENSHIFT_MONGODB_DB_PORT,function(err){ 
        if(err){
          console.log("Erro ao conectar com MongoDb. Erro: "+err);
        }
    });
}

/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        self.routes = { };

        self.routes['/asciimo'] = function(req, res) {
            var link = "http://i.imgur.com/kmbjB.png";
            res.send("<html><body><img src='" + link + "'></body></html>");
        };

        self.routes['/'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('index.html') );
        };
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        //self.createRoutes();
        self.app = express();

        // view engine setup
        self.app.engine('html', require('ejs').renderFile);
        self.app.set('view engine', 'html');
        self.app.use(bodyParser.json());
        self.app.use(bodyParser.urlencoded({ extended: false }));
        self.app.use(cookieParser());
        self.app.use(express.static(path.join(__dirname, 'public')));

        //sessions
        self.app.use(session({
          cookieName: 'session',
          secret: 'kjlçkjsisjuskhahgskjd',
          duration: 30*60*1000,
          activeDuration: 5*60*1000,
        }));

        self.app.use(function(request,response,next){
          request.rules = function(controller,action,rules,callback){
            var error = "";
            if(rules.token && request.get("aptosys")){
              var user = require("./modules/addpeople/entities/people");
              user.findOne({"user.token":request.get("aptosys")},function(fduError,fduUser){
                if(fduError){
                  error = "Sua conta não existe mais. Por favor cadastre-se novamente.";
                }
                else{
                  console.log(fduUser == null);
                  if(fduUser == null){                    
                    error = "Este usuário não tem o nível de previlégio necessário.";
                  }
                  if(rules.logged){
                    if(!(request.session && request.session.user))
                      error = "É necessário efetuar o login para acessar esta requisição.";
                  }
                  callback(error);
                }
              });
            }
          }
          next();
        });

        require("./router")(self.app);



        // catch 404 and forward to error handler
        self.app.use(function(req, res, next) {
          var err = new Error('Not Found');
          err.status = 404;
          next(err);
        });

        // error handlers

        // development error handler
        // will print stacktrace
        if (self.app.get('env') === 'development') {
          self.app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
              message: err.message,
              error: err
            });
          });
        }

        // production error handler
        // no stacktraces leaked to user
        self.app.use(function(err, req, res, next) {
          res.status(err.status || 500);
          res.render('error', {
            message: err.message,
            error: {}
          });
        });
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();

