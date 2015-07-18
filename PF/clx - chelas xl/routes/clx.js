/**
 * Created by Jo�o on 16/07/2015.
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

// change
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
    return res.render('novoanuncio', { user: req.user});
});
//falta guardar foto
router.post('/new', function(req, res, next) {
    var anuncio = {
        preco: req.body.preco,
        descricao: req.body.desc,
        titulo: req.user.titulo,
        cidade: req.body.cidade,
        categorias: req.body.categorias
    };
    if(queixa.titulo === '') {
        return res.redirect('back');
    }
    if(queixa.descricao === '') {
        queixa.descricao = null;
    }
    console.log(queixa);
    db.newAnnounc(anuncio, function(err, an) {
        if(err) return next(err);
        console.log(an);
        return res.redirect('/queixinhas/' + an.id);
    });
});

router.get('/:id', function(req, res, next) {
    if(!req.user) req.user.username = '';
    db.getUser(req.user.username, function(err, user) {
        if(err && err.message !== 'RECORD NOT FOUND') return next(err);
        db.getAnnounc(req.params.id, function(err, ann){
            if(err && err.message !== 'RECORD NOT FOUND') return res.redirect('/queixinhas');
            if(user && ann)
            //falta
                db.isfollowing(user.username, ann.id, function(err){
                    /*if(!err) queixa.isfollowing = true;
                    else queixa.isfollowing = false;*/
                    return res.render('Anuncio', {Announ: ann, user: user});
                });
            else
                return res.render('Anuncio', {Announ: ann, user:user});
        });
    });
});


router.get('/:id/edit', function(req, res, next) {
    db.getAnnounc(req.params.id, function(err, ann){
        if(err) return next(err);
        if(ann.autor !== req.user.username)	return res.redirect('/queixinhas/' + req.params.id);
        if(err) return next(err);
        db.getUser(req.user.username, function(err, user){
            if(err) return next(err);
            return res.render('edit', { Announ : ann, user : user});
        });
    });
});

router.post('/:id/edit', function(req, res, next) {
    db.getAnnounc(req.params.id, function(err, ann) {
        if(err) return next(err);
        db.getUser(req.user.username, function(err, user) {
            if(!user.vendedor && ann.autor !== req.user.username) return res.redirect('back');
            var anuncioEdit = new db.anuncio();
            anuncioEdit = {
                id:null,
                titulo:req.body.title,
                descricao:req.body.desc,
                autor:req.user

            };
            console.log(anuncioEdit);
            if(anuncioEdit.titulo = "") {
                return res.render('back');
            }
            /*if(anuncioEdit.fechada === 'on')
                ann.fechada = true;
            else
                ann.fechada = false;*/
            queixa.titulo = queixaEdit.titulo;
            queixa.descricao = queixaEdit.descricao;
            queixa.categorias = queixaEdit.categorias;

            if(queixa.descricao === '') {
                queixa.descricao = null;
            }
            /*db.updatequeixinha(queixa, function(err){
                if(err) return next(err);
            });*/
            var commenttext = 'Esta queixinha foi editada por '+user.username;
            var comment = {idqueixinha: ann.id, comentario:commenttext, username:user.username};
            db.newComment(comment, function(err){
                if(err) return next(err);
            });
            return res.redirect('/queixinhas');
        });
    });
});


module.exports = router;