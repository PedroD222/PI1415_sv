/**
 * Created by João on 16/07/2015.
 */

var express = require('express');
var router = express.Router();
//var db = require('../dbaccess');

/* GET home page. */
router.get('/', function(req, res, next) {
    //eventually will do something useful
    return res.render("CLX");
});

module.exports = router;