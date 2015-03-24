var http = require('http');
var employeeService = require('./lib/employees');

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
    empolyeeService.getEmployees(function (error, data) {
      if (error) {
        // Send a 500 error.
        res.writeHead(500);
      }
      // Send the data with a 200 status code.
    });
  } else if (_url = /^\/employees\/(\d+)$/i.exec(req.url)) {
    // Find the employee by the id in the route.
    employeeService.getEmployee(_url[1], function (error, data) {
      if (error) {
        // Send a 500 error.
        res.writeHead(500);
      }

      if (!data) {
        // Send a 404 error.
        res.writeHead(404);
      }

      // Send the data with a 200 status code.
    });
  } else {
    // Try to send the static file if it exists, if not, send a 404.
  }
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
