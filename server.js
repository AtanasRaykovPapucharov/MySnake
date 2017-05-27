var express = require('express'), port = 3003, path = require('path');
app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);
console.log('Server running on port: ' + port);
require('openurl').open('http://localhost:' + port);