/**
 * Created by João on 16/07/2015.
 */

var express = require('express');
var router = express.Router();
//var db = require('../dbaccess');

/* GET home page. */
router.get('/', function home(req, res, next) {
    //eventually will do something useful
    //return res.render("index", {req:user});
    db.getUser(req.user.username, function(err, user){
        if(err) {
            if(err.message !== 'RECORD NOT FOUND')
                return next(err);
        }
        console.log('got user');
        db.getCountQueixinhas(function(err, count) {
            count = Math.ceil(count/10);
            console.log(count);
            if(count > 0 && req.user.username){
                db.getvotobyuser(user.username, function(err, votos){
                    if(err) {
                        if(err.message !== 'RECORD NOT FOUND')
                            return next(err);
                    }
                    db.getQueixinhasbyIntUser(user.username, function(err, interested){
                        if(err) {
                            if(err.message !== 'RECORD NOT FOUND')
                                return next(err);
                        }
                        queixas.forEach(function(queixa){
                            queixa.voto = 0;
                            queixa.isfollowing = false;
                            if(votos) {
                                votos.forEach(function(voto){
                                    if(queixa.id === voto.queixinha)
                                        queixa.voto = voto.voto;
                                });
                            }
                            if (interested){
                                interested.forEach(function(following){
                                    if(following.id === queixa.id)
                                        queixa.isfollowing = true;
                                });
                            }
                        });
                    });
                    return res.render('queixinhas', {queixas: queixas, user:req.user, page:page, total:count});
                });
            }
            else{
                return res.render('queixinhas', {queixas: queixas, user:req.user, page:page, total:count});
            }
        });

    res.render('index', { title: 'CLX - Chelas' });
});

module.exports = router;