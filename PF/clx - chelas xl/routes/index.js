/**
 * Created by João on 16/07/2015.
 */

var express = require('express');
var router = express.Router();
var db = require('../dbaccess');

/* GET home page. */
router.get('/', function home(req, res, next) {
    //eventually will do something useful
    //return res.render("index", {req:user});

    if (req.user)
        db.getUser(req.user.username, function(err, user){
            if(err) {
                if(err.message !== 'RECORD NOT FOUND')
                    return next(err);
            }

           // res.render('index', { title: 'CLX - Chelas' });
        });

    res.render('index', { title: 'CLX - Chelas' });
});

module.exports = router;