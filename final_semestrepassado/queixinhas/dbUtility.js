module.exports = {
    SelectAll:    dbSelectAll,
    SelectOne:    dbSelectOne,
    ExecuteQuery: dbExecuteQuery,
    SelectSome : dbSelectSome
}


///////////////////////////////////////////////////////////////////////////////////////////
///
/// Database utility functions
///
var config = require(require('path').resolve(__dirname, ".", "config.js"));
var pg = require("pg");
///
function dbSelectAll(query, createElem, cb)
{
    pg.connect(config.getConnString(), function(err, client, done) {
        if(err) 
            return cb(err);
        client.query(query, function(err, result) {
                done();
                if(err) 
                    return cb(err);
                var elems = result.rows.map(createElem);
                cb(null, elems);
        });
    });
}

function dbSelectOne(query, queryParams, createElem, cb)
{
    pg.connect(config.getConnString(), function(err, client, done) {
        if(err) 
            return cb(err);
        client.query(query, queryParams, function(err, result) {
            done();
            if(err) 
                return cb(err);

            if(result.rowCount == 0) 
                return cb(new Error("RECORD NOT FOUND"), null);
            if(result.rowCount > 1)  
                return cb("More than one element selected.", null);
            var elem = createElem(result.rows[0]);
            cb(null, elem);
        });
    });
}

function dbSelectSome(query, queryParams, createElem, cb)
{
    pg.connect(config.getConnString(), function(err, client, done) {
        if(err) 
            return cb(err);
        client.query(query, queryParams, function(err, result) {
            done();
            if(err) 
                return cb(err);

            if(result.rowCount == 0) 
                return cb(new Error("RECORD NOT FOUND"), null);
            var elem = [];
            for (var i = 0; i<result.rows.length; i++) {
                elem[i] = createElem(result.rows[i]);
            }
            //var elem = createEcreateElem(lem(result.rows[0]);
            cb(null, elem);
        });
    });
}

function dbExecuteQuery(query, queryParams, cb) {
    pg.connect(config.getConnString(), function(err, client, done) {
        if(err) 
            return cb(err);
        client.query(query, queryParams, function(err, result) {
            done();
            if(err) 
                return cb( err);
            if(result.rowCount != 1) 
                return cb(new Error("Cannot executeQuery"), null);
            //console.log("asdfghjklçasdfghjklçºasdfghjklçºsdghjklçº")
            //console.log(result.rows[0])
            cb(null, result.rows[0]);
        });
    });
}