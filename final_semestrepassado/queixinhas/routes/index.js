var express = require('express');
var router = express.Router();
var db = require('../dbaccess');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.user);	
	//check user authentication
	//get list of top/most recent entries for unauthenticated users
	//else get list of entries, add paging
	console.log('no user');
	db.getQueixinhas(1, function(err, queixas){		
		if(err) {
			if(err.message !== 'RECORD NOT FOUND')
				return next(err);
		}
		console.log('got list');
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
								if(votos != null) {
									 votos.forEach(function(voto){										
										if(queixa.id === voto.queixinha)
											queixa.voto = voto.voto;
									});
								}
								if (interested !== null){
									interested.forEach(function(following){
										if(following.id === queixa.id)
											queixa.isfollowing = true;
									});
								}
							});
							});
						return res.render('index', {queixas: queixas, user:req.user});
					});
				}
				else{				
					return res.render('index', {queixas: queixas, user:req.user});
				}
			});
		});
	});
	
});

module.exports = router;
