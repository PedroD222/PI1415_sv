/**
 * Created by Jo�o on 16/07/2015.
 */

var express = require('express');
var router = express.Router();
var db = require('../dbaccess');

/* GET home page. */
router.get('/', function home(req, res, next) {
    db.getUser(req.user.username, function(err, user){
        if(err) {
            if(err.message !== 'RECORD NOT FOUND')
                return next(err);
        }

        return res.render('index', { user: user, title: 'CLX - Chelas' });
    });
});

module.exports = router;