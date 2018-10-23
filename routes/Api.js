////////////////////////////////////////////////////////////////////////////////
var SparqlControllerClass = require('../controllers/SparqlController.js');
var AjaxRequest = require('../libraries/AjaxRequest.js');
////////////////////////////////////////////////////////////////////////////////
const SparqlController = new SparqlControllerClass();
const ajaxRequest = new AjaxRequest();
////////////////////////////////////////////////////////////////////////////////
module.exports = function (app, passport) {
  // api testing route
  app.get('/api', function (request, response) {
    ajaxRequest.jsonRequest("https://reqres.in/api/users", "GET", {}, function (result) {
      response.send(result.data);
    });
  });
  // SPARQL testing route
  app.get('/sparql', function (request, response) {
    SparqlController.sparql(response);
  });
};
////////////////////////////////////////////////////////////////////////////////