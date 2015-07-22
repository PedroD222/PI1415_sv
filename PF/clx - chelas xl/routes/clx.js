/**
 * Created by João on 16/07/2015.
 */

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
            return res.redirect('/announcements');
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
    db.getAnnouncs(page, function(err, listann){
        if (err)
            return next(err);
        db.getCountAnnounc(function(err, c) {
            if (err)
                return next(err);
            return res.render('announcements', {user: req.user, list : listann, total : c, page : page});
        });
    });
});

router.get('/dashboard', function(req, res, next) {

    /*db.getUser(req.user.username, function(err, user){
        if(err) {
            if(err.message !== 'RECORD NOT FOUND')
                return next(err);
        }*/
        db.getAnnouncUser(req.user.username, function(err, annUser){
            console.log("User dash" + req.user);
            if(err) {
                if(err.message !== 'RECORD NOT FOUND')
                    return next(err);
            }
            db.getAnnouncFavoriteUser(req.user.username, function(err, favorite){
                if(err) {
                    if(err.message !== 'RECORD NOT FOUND')
                        return next(err);
                }
                console.log("annUser "+annUser);
                console.log("annFavor "+favorite);
                return res.render('dashboard', {user: req.user, annUser : annUser, annFavorite : favorite});
            });
        });
    //});
});


router.get('/new', function(req, res, next) {
    console.log('GOT TO NEW');
    return res.render('newannouncement', { user: req.user});
});
//falta guardar foto
router.post('/new', function(req, res, next) {
    var anuncio = {
        preco: req.body.preco,
        descricao: req.body.desc,
        titulo: req.user.titulo,
        cidade: req.body.cidade,
        categoria: req.body.categoria,
        vendedor : req.body.vend
    };
    if(anuncio.titulo === '') {
        return res.redirect('back');
    }
    console.log(anuncio);
    db.newAnnounc(anuncio, function(err, an) {
        if(err) return next(err);
        console.log(an);
        return res.redirect('/announcements/' + an.id);
    });
});

router.get('/:id', function(req, res, next) {
    if(!req.user) req.user.username = '';
    db.getUser(req.user.username, function(err, user) {
        if(err && err.message !== 'RECORD NOT FOUND') return next(err);
        db.getAnnounc(req.params.id, function(err, ann){
            if(err && err.message !== 'RECORD NOT FOUND') return res.redirect('/anuncios');
            if(user && ann)
            //falta
                db.isfollowing(user.username, ann.id, function(err){
                    /*if(!err) queixa.isfollowing = true;
                    else queixa.isfollowing = false;*/
                    return res.render('announcement', {Announ: ann, user: user});
                });
            else
                return res.render('announcement', {Announ: ann, user:user});
        });
    });
});


router.get('/:id/edit', function(req, res, next) {
    db.getAnnounc(req.params.id, function(err, ann){
        if(err) return next(err);
        if(ann.autor !== req.user.username)	return res.redirect('/announcements/' + req.params.id);
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
            anuncio.titulo = anuncioEdit.titulo;
            anuncio.descricao = anuncioEdit.descricao;
            anuncio.categorias = anuncioEdit.categoria;

            /*db.updatequeixinha(queixa, function(err){
                if(err) return next(err);
            });*/
            var commenttext = 'Este anuncio foi editado por '+user.username;
            var comment = {idann: ann.id, comentario:commenttext, username:user.username};
            db.newComment(comment, function(err){
                if(err) return next(err);
            });
            return res.redirect('/announcements');
        });
    });
});


module.exports = router;