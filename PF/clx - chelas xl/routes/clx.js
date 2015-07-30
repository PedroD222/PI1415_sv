/**
 * Created by João on 16/07/2015.
 */
var fs = require('fs');
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
        //if(req.user.username)
            page = req.query.page;
    }
    db.getAnnouncs(page, function(err, listann){
        if (err)
            return next(err);
        db.getCountAnnounc(function(err, c) {
            if (err)
                return next(err);
            var total = Math.ceil(c/10);
            return res.render('announcements', {user: req.user, list : listann, total : total, page : page});
        });
    });
});

router.get('/dashboard', function(req, res, next) {
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
});


router.get('/new', function(req, res, next) {
    console.log('GOT TO NEW');
    return res.render('newannouncement', { user: req.user});
});

// TODO falta guardar foto
router.post('/new', function(req, res, next) {
    var anuncio = new db.anuncio(req.body.titulo, req.body.desc,
        req.user.username,req.body.categoria, false, req.body.preco, req.body.localizacao);

    if(anuncio.titulo === '') {
        return res.redirect('back');
    }
    /*TODO fs.readFile(req.body.imagem, function(err, data) {
        if (err) return next(err);
        console.log(data.toString());*/
        //anuncio.foto = data.toString('ascii');
        db.newAnnounc(anuncio, function (err, an) {
            if (err) return next(err);
            console.log(an);
            return res.redirect('/announcements/' + an.id);
        });
    //});
});

router.get('/:id', function(req, res, next) {
    if(!req.user) req.user.username = '';
    db.getUser(req.user.username, function(err, usr) {
        if(err && err.message !== 'RECORD NOT FOUND') return next(err);
        db.getAnnounc(req.params.id, function(err, ann){
            if(err) return res.redirect('/announcements');
            db.getPontuacaoUtil(ann.vendedor, function(err, ponts) {
                console.log("user"+ann.username);
                if (err) {
                    if (err.message !== 'RECORD NOT FOUND')
                        return next(err);
                    ponts = [];
                }
                var valponts = 0;
                ponts.forEach(function(p){valponts += p.pontuacao});
                if (valponts!==0)
                    valponts = valponts/ponts.length;

                db.getComentAnnounc(req.params.id, function (err, cmts) {
                    if (err) {
                        if (err.message !== 'RECORD NOT FOUND')
                            return next(err);
                        cmts = [];
                    }
                    db.getAnnouncFavoriteUserAnn(req.user.username,req.params.id, function (err, favorites) {
                        if (err) {
                            if (err.message !== 'RECORD NOT FOUND')
                                return next(err);
                        }
                        var favorite = false;
                        if (favorites)
                            favorite =true;
                        db.getClassifUtil(ann.vendedor, req.user.username, function (err, v) {
                            if (err) {
                                if (err.message !== 'RECORD NOT FOUND')
                                    return next(err);
                            }
                            console.log("votantes"+v);
                            var allow = false;
                            if (v)
                                allow = true;
                            return res.render('announcement', { Announ: ann, user: req.user, comments: cmts, subscribed: favorite, classification : valponts, allowclassification : allow});
                        });
                    });
                });
            });
        });
    });
});


router.get('/:id/edit', function(req, res, next) {
    db.getUser(req.user.username, function(err, user){
        if(err) return next(err);
        db.getAnnounc(req.params.id, function(err, ann){
            if(err) return next(err);
            if(ann.vendedor !== req.user.username)	return res.redirect('/announcements/' + req.params.id);
            return res.render('edit', { Announ : ann, user : user});
        });
    });
});

router.post('/:id/edit', function(req, res, next) {
    db.getAnnounc(req.params.id, function(err, ann) {
        if(err) return next(err);
        db.getUser(req.user.username, function(err, user) {
            if(!user.username && ann.vendedor !== req.user.username) return res.redirect('back');

            var anuncioEdit = {
                id          : req.params.id,
                titulo      : req.body.titulo,
                desc        : req.body.desc,
                preco       : req.body.preco,
                localizacao : req.body.localizacao,
                categoria   : req.body.categoria,
                fechado     : req.body.closed
            };
            console.log(anuncioEdit);
            if(anuncioEdit.titulo == "" && anuncioEdit.desc == "" && anuncioEdit.categoria == ""
                && anuncioEdit.localizacao == "" && anuncioEdit.preco == "") {
                return res.render('back');
            }
            if(anuncioEdit.fechado === 'on')
                anuncioEdit.fechado = true;
            else
                anuncioEdit.fechado = false;
            db.updateAnn(anuncioEdit,  function(err, a) {
                if (err) return next(err);
                return res.redirect('/announcements/'+anuncioEdit.id);
            });
        });
    });
});

router.post('/:id/subscribe', function(req, res, next) {
    db.getAnnounc(req.params.id, function(err, ann) {
        if(err) return next(err);
        db.getUser(req.user.username, function(err, u) {
            if (err) return next(err);
            db.newAnnouncFavorite(ann, u, function(err, fav) {
                if (err) return next(err);
                return res.redirect('/announcements/'+ann.id);
            });
        });
    });
});

router.post('/:id/unsubscribe', function(req, res, next) {
    db.getAnnounc(req.params.id, function(err, ann) {
        if(err) return next(err);
        db.getUser(req.user.username, function(err, u) {
            if (err) return next(err);
            db.delAnnounFavorite(ann, u, function(err, f) {
                if (err) return next(err);
                return res.redirect('/announcements/'+req.params.id);
            });
        });
    });
});

router.post('/:id/classification', function(req, res, next) {
    db.getAnnounc(req.params.id, function(err, ann) {
        if(err) return next(err);
        db.getUser(ann.vendedor, function(err, u) {
            if (err) return next(err);
            db.newPontuser(req.user, req.body.classbtn, ann.vendedor, function(err, u) {
                if (err) return next(err);
                return res.redirect('/announcements/'+req.params.id);
            });
        });
    });
});
//TODO find
router.post('/find', function(req, res, next){
    //req.query.searchPlace, req.query.searchTitle, req.query.searchCat
    console.log("params"+req.body.searchPlace);
    db.getAnnounByFilter(req.body.searchPlace, req.body.searchTitle, req.body.searchCat, function(err, ann) {
        if (err) return next(err);
        console.log("lista"+ ann[0]);
        return res.render('announcements',{list : ann, user : req.user, page : 1, total : ann.length});
    });
});

router.post('/:id/comment', function(req, res, next) {
    db.getAnnounc(req.params.id, function(err, ann) {
        if(err) return next(err);
        db.getUser(req.user.username, function(err, user) {
            var commenttext = req.body.comment;
            var usercmt = 'Este anuncio foi comentado por '+user.username;
            var comment = {id_an: ann.id, comentario:commenttext, username:user.username};
            db.newComment(comment, function(err){
                if(err)
                    return next(err);
                console.log(usercmt);
            });
            return res.redirect('/announcements');
        });
    });
});

module.exports = router;