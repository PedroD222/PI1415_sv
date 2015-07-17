/**
 * Created by João on 16/07/2015.
 */

var express = require('express');
var router = express.Router();
//var db = require('.././dbaccess');
var regex_single = /^\/\d+$/;
var regex_list = /^\/(\?page=\d*|$)$/;

router.use(function(req, res, next) {
    console.log('serving ' + req.url + ' to ' + req.user);

    if(!regex_single.test(req.url) && !regex_list.test(req.url)){
        if(!req.user.username){
            console.log('REDIRECTING');
            return res.redirect('/anuncios');
        }
    }
    return next();
});

router.get('/', function(req, res, next) {
    //something will be done here!!!
});