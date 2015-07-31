//to run console debug: SET DEBUG=clx,express:* & nodemon server.js
var debug = require('debug')('clxchelas');
var app = require('./app');

app.set('port', process.env.PORT || 3005);

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});