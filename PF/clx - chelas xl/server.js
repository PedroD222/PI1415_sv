/**
 * Created by Pedro on 18-07-2015.
 */
    //to run console: SET DEBUG=clx,express:* & nodemon server.js
var debug = require('debug')('clxchelas');
var app = require('./app');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
    debug('Ready to rock');
});