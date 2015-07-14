var express = require('express');
var router = express.Router();
var db = require('.././dbaccess');
var regex_single = /^\/\d+$/;
var regex_list = /^\/(\?page=\d*|$)$/;

router.use(function(req, res, next) {
	console.log('serving ' + req.url + ' to ' + req.user);
	
	if(!regex_single.test(req.url) && !regex_list.test(req.url)){		
	if(!req.user.username){
		console.log('REDIRECTING');
		return res.redirect('/queixinhas');
	}
	}
	return next();
});

router.get('/', function(req, res, next) {
	var page = 1;
	if(req.query.page){
		if(req.user.username)
			page = req.query.page;
	}
	console.log('getting list');
	db.getQueixinhas(page, function(err, queixas){		
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
		});
	});

});

router.get('/dashboard', function(req, res, next) {
	db.getQueixinhasUtilizador(req.user.username, function(err, queixasbyuser){
		if(err) {			
			if(err.message !== 'RECORD NOT FOUND')
			return next(err);
		}
		db.getQueixinhasbyIntUser(req.user.username, function(err, interest){
			if(err) { 
				if(err.message !== 'RECORD NOT FOUND')
				return next(err);
			}
			if(queixasbyuser)
				queixasbyuser.forEach(function(value){
					value.isfollowing = true;
				});
			if(interest)
				interest.forEach(function(value){
					value.isfollowing = true;
				});
			return res.render('dashboard', {user: req.user, queixasuser:queixasbyuser, queixasinterested:interest});
		});	
	});
});


router.get('/new', function(req, res, next) {
	console.log('GOT TO NEW');
	return res.render('novaqueixinha', { user: req.user});
});

router.post('/new', function(req, res, next) {
	var queixa = {
		titulo: req.body.title, 
		descricao: req.body.desc,
		autor: req.user.username,
		georef: req.body.geo,
		categorias: req.body.categorias
		};
	if(queixa.titulo === '') {
		return res.redirect('back');
	}
	if(queixa.descricao === '') {
		queixa.descricao = null;
	}
	console.log(queixa);
	db.newQueixinha(queixa, function(err, queixa) {
			if(err) return next(err);
			console.log(queixa);		
			return res.redirect('/queixinhas/' + queixa.id);
	});
});

router.get('/:id', function(req, res, next) {
	if(!req.user) req.user.username = '';
	db.getUser(req.user.username, function(err, user) {
		if(err && err.message !== 'RECORD NOT FOUND') return next(err);
		db.getQueixinha(req.params.id, function(err, queixa){
			if(err && err.message !== 'RECORD NOT FOUND') return res.redirect('/queixinhas');
			if(user && queixa)
				db.isfollowing(user.username, queixa.id, function(err){
					if(!err) queixa.isfollowing = true;
					else queixa.isfollowing = false;					
				return res.render('queixinha', {queixa: queixa, user: user});
				});
			else
				return res.render('queixinha', {queixa:queixa, user:user});
		});
	});
});


router.get('/:id/edit', function(req, res, next) {
	db.getQueixinha(req.params.id, function(err, queixa){
		if(err) return next(err);	
		if(queixa.autor !== req.user.username)	return res.redirect('/queixinhas/' + req.params.id);
		if(err) return next(err);
		db.getUser(req.user.username, function(err, user){
			if(err) return next(err);
			return res.render('edit', {queixa:queixa, user:user});
		});
	});
});

router.post('/:id/edit', function(req, res, next) {
	db.getQueixinha(req.params.id, function(err, queixa) {
		if(err) return next(err);
		db.getUser(req.user.username, function(err, user) {
			if(!user.gestor && queixa.autor !== req.user.username) return res.redirect('back');
			var queixaEdit = new db.queixinha();
			queixaEdit = {
				id:null, 
				titulo:req.body.title, 
				descricao:req.body.desc, 
				autor:req.user, 				
				fechada: req.body.closed
				};
			console.log(queixaEdit);
			if(queixaEdit.titulo = "") {
				return res.render('back');
			}
			if(queixaEdit.fechada === 'on')
				queixa.fechada = true;
			else
				queixa.fechada = false;
			queixa.titulo = queixaEdit.titulo;
			queixa.descricao = queixaEdit.descricao;
			queixa.categorias = queixaEdit.categorias;			
			
			if(queixa.descricao === '') {
				queixa.descricao = null;
			}
			db.updatequeixinha(queixa, function(err){
				if(err) return next(err);
			});
			var commenttext = 'Esta queixinha foi editada por '+user.username;
			var comment = {idqueixinha: queixa.id, comentario:commenttext, username:user.username};
			db.newComment(comment, function(err){
				if(err) return next(err);
			});
			return res.redirect('/queixinhas');
		});
	});
});

router.post('/:id:/downvote', function(req,res,next){
	db.getUser(req.user.username, function(err, user){
		if(err){
			console.log(err);
			return next(err);
		}
		db.getQueixinha(req.params.id, function(err, queixa){
			if(err){
				console.log(err);
				return next(err);
			}	
			db.newvoto(user.username, queixa.id, false, function(err){ 
				return res.render('queixinha', { user: user, queixa: queixa, voted: user.voted});
			});
		});
	});
});

router.post('/:id/upvote', function(req, res, next) {
	db.getUser(req.user.username, function(err, user){
		if(err){
			console.log(err);
			return next(err);
		}
		db.getQueixinha(req.params.id, function(err, queixa){
			if(err){
				console.log(err);
				return next(err);
			}	
			db.newvoto(user.username, queixa.id, true, function(err){ 
				return res.render('queixinha', { user: user, queixa: queixa, voted: user.voted});
			});
		});
	});
});

router.post('/:id/unvote', function(req, res, next) {
	db.getUser(req.user.username, function(err, user){
		if(err){
			console.log(err);
			return next(err);
		}
		db.getQueixinha(req.params.id, function(err, queixa){
			if(err){
				console.log(err);
				return next(err);
			}
			db.deletevoto(user.username, queixa.id, function(err){
				if(err) {
					console.log(err);
					return next(err);
				}
				return res.end();
			});
		});
	});
	return res.end();
});

router.post('/:id/subscribe', function(req, res, next) {
	db.getUser(req.user.username, function(err, user){
		if(err) return next(err);
		db.getQueixinha(req.params.id, function(err, queixa){
			if(err) return next(err);
			db.newQueixinhaUtilizador(user.username, req.params.id, function(err){
				if(err) return next(err);
				return res.redirect('back');
		});
	});
});

router.post('/:id/unsubscribe', function(req, res, next) {
	db.getUser(req.user.username, function(err, user){
		if(err) return next(err);
		db.getQueixinha(req.params.id, function(err, queixa){
			if(err) return next(err);
			db.deleteQueixinhaUtilizador(user.username, req.params.id, function(err){
				if(err) return next(err);
				return res.redirect('back');
			});
			});
		});
	});
});

router.post('/:id/comment', function(req, res, next) {
	db.getUser(req.user.username, function(err, user) {
		if(err){
			return next(err);
		}
		if(req.body.comment === '') {
			return res.render('/:id/', {user: user, error:'Comentário não pode ser vazio'});
		}
		db.getQueixinha(req.params.id, function(err, queixa){
			if(err) return(err);
			var comment = {idqueixinha:req.params.id, comentario:req.body.comment, username:user.username};
			db.newComment(comment, function(err){
				if(err) return next(err);
			});
			return res.redirect('back');
		});
	});
});

module.exports = router;