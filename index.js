var http = require('http');

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
    res.writeHead(200);
    return res.end('employee list');
  } else if (_url = /^\/employees\/(\d+)$/i.exec(req.url)) {
    // Find the employee by the id in the route.
    res.writeHead(200);
    return res.end('a single employee');
  } else {
    // Try to send the static file.
    res.writeHead(200);
    return res.end('static file maybe');
  }
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
