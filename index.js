var http = require('http');
var employeeService = require('./lib/employees');
var responder = require('./lib/responseGenerator');
var staticFile = responder.staticFile('/public');
require('./lib/connection');

http.createServer(function (req, res) {
  // A parsed URL to work with in case there are parameters.
  var _url;

  // In case the client uses lower-case for methods.
  req.method = req.method.toUpperCase();
  console.log(req.method + ' ' + req.url);

  if (req.method !== 'GET') {
    res.writeHead(501, {
      'Content-Type': 'text/plain'
    });
    return res.end(req.method + ' is not implemented by this server.');
  }

  if (_url = /^\/employees$/i.exec(req.url)) {
    // Return a list of valid employees.
    employeeService.getEmployees(function (error, data) {
      if (error) {
        // Send a 500 error.
        return responder.send500(error, res);
      }
      // Send the data with a 200 status code.
      return responder.sendJson(data, res);
    });
  } else if (_url = /^\/employees\/(\d+)$/i.exec(req.url)) {
    // Find the employee by the id in the route.
    employeeService.getEmployee(_url[1], function (error, data) {
      if (error) {
        // Send a 500 error.
        return responder.send500(error, res);
      }

      if (!data) {
        // Send a 404 error.
        return responder.send404(res);
      }

      // Send the data with a 200 status code.
      return responder.sendJson(data, res);
    });
  } else {
    // Try to send the static file if it exists, if not, send a 404.
    res.writeHead(200);
    res.end('static file maybe');
  }
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
