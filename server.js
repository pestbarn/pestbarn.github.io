const connect = require('connect'),
    serveStatic = require('serve-static'),
    path = require('path');

connect().use(serveStatic(path.join(__dirname, 'app'))).listen(8080, function(){
    console.log('Server running on 8080...');
});
