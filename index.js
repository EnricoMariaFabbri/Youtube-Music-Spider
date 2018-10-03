// ////////////////////////////////////////////////////////////////////////////////

// // IMPORT MODULE
// var express     =   require('express');
// var ApiRoutes   =   require('./Routes/Api');
// var WebRoutes   =   require('./Routes/Web');
// var AuthRoutes  =   require('./Routes/Auth');
// var cors        =   require('cors');
// var env         =   require('dotenv').load();
// var bodyParser  =   require('body-parser');
// var passport    =   require('passport')
// var session     =   require('express-session')

// ////////////////////////////////////////////////////////////////////////////////

// // IMPORT SCHEMA
// // ...

// var AuthController = require('./Controllers/AuthController.js');

// ////////////////////////////////////////////////////////////////////////////////

// // INSTANCE GLOBAL OBJECT
// var app = express();
// // app.use(cors({ origin: 'http://italiancoders.it'}));   // project url
// app.use(cors());
// app.use(bodyParser.json()); // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
//   extended: true
// }));

// ////////////////////////////////////////////////////////////////////////////////

// // PASSPORT
// app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// require('./Libraries/Passport.js')(passport);

// ////////////////////////////////////////////////////////////////////////////////

// // MIDDLEWARE 1
// app.use(function(req, res, next) {
//   // console.log("MIDDLEWARE 1 : controllo di sicurezza passatto correttamente");
//   next();
// });

// ////////////////////////////////////////////////////////////////////////////////

// // MIDDLEWARE 2
// app.use(function(req, res, next) {
//   // console.log("MIDDLEWARE 2 : controllo di sicurezza passatto correttamente");
//   next();
// });

// ////////////////////////////////////////////////////////////////////////////////

// // set enviroment configuration
// app.set('port', (5000 || process.env.PORT || 9000));
// app.use(express.static(__dirname + '/Static'));
// app.set('view engine', 'ejs');

// ////////////////////////////////////////////////////////////////////////////////

// // ROUTES
// // ApiRoutes(app, passport);
// //WebRoutes(app, passport);
// //AuthRoutes(app, passport);

// app.get('/', function(request, response) {
//   response.send('Progetto TW');
//   //response.render('pages/index');
// });
// // route for testing db
// app.get('/db', AuthController.userLoggedIn, function(request, response) {
//   testController.visualizzoDatiDiProva(response);
// });

// ////////////////////////////////////////////////////////////////////////////////

// // PASSPORT
// require('./Libraries/Passport.js')(passport);

// ////////////////////////////////////////////////////////////////////////////////

// // LISTENER
// app.listen(app.get('port'), function() {
//   console.log("••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••");
//   console.log("••••••••••••••••• YOUTUBE MUSIC SPIDER [1.0.0] •••••••••••••••••");
//   console.log("••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••");
// });

// ////////////////////////////////////////////////////////////////////////////////


// ////////////////////////////////////////////////////////////////////////////////
// //                            IMPORT MODULE
// var express = require('express');
// var router = require('./router');
// var cors = require('cors');
// require('dotenv').config({
//   path: __dirname + '/.env'
// });
// var bodyParser = require('body-parser');
// ////////////////////////////////////////////////////////////////////////////////
// //                            IMPORT SCHEMA
// // ...
// ////////////////////////////////////////////////////////////////////////////////
// //                        INSTANCE GLOBAL OBJECT
// var app = express();
// // project url
// // app.use(cors({ origin: 'http://italiancoders.it'}));      
// app.use(cors());
// app.use(bodyParser.json()); // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
//   extended: true
// }));
// ////////////////////////////////////////////////////////////////////////////////
// //                              MIDDLEWARE 1
// app.use(function(req, res, next) {
//   // console.log("MIDDLEWARE 1 : controllo di sicurezza passatto correttamente");
//   next();
// });
// ////////////////////////////////////////////////////////////////////////////////
// //                              MIDDLEWARE 2
// app.use(function(req, res, next) {
//   // console.log("MIDDLEWARE 2 : controllo di sicurezza passatto correttamente");
//   next();
// });
// ////////////////////////////////////////////////////////////////////////////////
// // set enviroment configuration
// app.set('port', (8000 || process.env.PORT || 9000));
// app.use(express.static(__dirname + '/public'));
// app.set('view engine', 'ejs');
// ////////////////////////////////////////////////////////////////////////////////
// // enable lister
// app.listen(app.get('port'), function() {
//   //console.log("Node app is running at localhost:" + app.get('port'));
//   console.log("******************* YMS - Youtube Music Spider [1.0.1] *******************");
//   // console.log(process.cwd());
// });
// ////////////////////////////////////////////////////////////////////////////////
// // instance custom router module
// router(app);
// //////////////////////////////////////////////////////////////////////////////





var express = require('express');
var cors = require('cors');
require('dotenv').config({
  path: __dirname + '/.env'
});
var bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.use(function(req, res, next) {
  console.log("MIDDLEWARE 1 : controllo di sicurezza passatto correttamente");
  next();
});

app.set('port', (8000 || process.env.PORT || 9000));
app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var TestController = require('./Controllers/TestController.js');
var AjaxRequest = require('./Libraries/AjaxRequest.js');
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var testView = new TestController();
var ajaxRequest = new AjaxRequest();

app.get('/', (req, res) => res.send('Main index of project!!'));
// route for testing db
app.get('/db', function(request, response) {
  testView.visualizzoDatiDiProva(response);
});
// api testing route
app.get('/api', function(request, response) {
  ajaxRequest.jsonRequest("https://reqres.in/api/users", "GET", {}, function(result) {
    response.send(result.data);
  });
});
// api testing route
app.get('/youtube', function(request, response) {
  testView.ricercaVideo(response, "Ninja", 10);
});
// api testing route
app.get('/youtube/:id', function(request, response) {
  var id = request.params.id;
  testView.visualizzoVideo(response, id);
});
// SPARQL testing route
app.get('/sparql', function(request, response) {
  testView.sparql(response);
});


console.log(__dirname);
app.listen(8000, () => console.log('Example app listening on port 8000!'));