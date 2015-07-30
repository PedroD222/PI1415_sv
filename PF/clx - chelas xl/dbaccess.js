var db = require('./dbUtility');

var access = {};

/*
CREATE TABLE Anuncio(
 titulo char(140) NOT NULL,
 descricao char(140),
 username char(50) NOT NULL,
 pontuacao_anuncio int,
 id int NOT NULL DEFAULT nextval('"anuncio_ID_seq"'::regclass),
 fechado boolean NOT NULL,
 categoria char(20))*/
access.anuncio = function anuncio(titulo, desc, vendedor, categoria, fechado, preco,localizacao, id, foto)
{
	this.id = id;
    this.titulo = titulo;
    this.desc = desc;
    this.preco = preco;
    this.vendedor = vendedor;
    this.categoria = categoria;
    this.fechado = fechado;
    this.localizacao = localizacao;
    this.foto = foto;
}

/*CREATE TABLE Utilizador(
 username char(50) NOT NULL,
 email char(50) NOT NULL,
 hash text NOT NULL,
 salt text NOT NULL,*/
access.user = function utilizador(username, email, hash, salt)
{
	this.username = username;
    this.email = email;
    //this.gestor = gestor;
    this.hash = hash;
    this.salt = salt;
}

/*CREATE TABLE Comentario(
 id_comentario int NOT NULL DEFAULT nextval('"Comentario_Id_seq"'::regclass),
 id_anuncio int NOT NULL DEFAULT nextval('"Comentario_Id_anuncio_seq"'::regclass),
 comentario char(140) NOT NULL,
 username char(50) NOT NULL)*/
access.comment = function comentario(id_an, coment, username, idc)
{
	this.id_an = id_an;
    this.coment = coment;
    this.username = username;
    this.idc = idc;
}

/*CREATE TABLE Categoria(
 designacao char(20) NOT NULL,
 CONSTRAINT "pkCat" PRIMARY KEY (designacao)
 )*/
access.categoria = function categoria(desig)
{
	this.desig = desig;
}

/*CREATE TABLE AnuncioUtilizadorFavorito(
    username char(50) NOT NULL,
    id_anuncio int NOT NULL DEFAULT nextval('"Comentario_Id_anuncio_seq"'::regclass),
)*/
access.favorito = function (user, id_an){
    this.username = user;
    this.id_an = id_an;
}

/*CREATE TABLE PontuacaoUtilizador(
id integer NOT NULL DEFAULT nextval('PontuacaoUtilizador_ID_seq'::regclass),
username char(50) not null,
pontacao int not null)*/
access.pontuacaoUtil = function(username, pontuacao, id, classif){
    this.username = username;
    this.pontuacao = pontuacao;
    this.id = id;
    this.classif = classif;
}

access.getAnnouncs = function (page, cb){
	//return lista de anuncios, pagina page
    var offset = (page-1) * 10;
	db.SelectAll("SELECT id, titulo, descricao, username, fechado, categoria, preco, localizacao FROM Anuncio where fechado = false ORDER BY id DESC LIMIT 10 OFFSET "+offset ,
    function (row) {
        return new access.anuncio( row.titulo, row.descricao, row.username, row.categoria, row.fechado, row.preco, row.localizacao, row.id);
    }, cb);
};

access.getAnnounc = function (id, cb) {
    db.SelectOne("SELECT id, titulo, descricao, username, fechado, categoria, preco, localizacao FROM Anuncio Where id = $1", [id] ,
        function (row) {
            return new access.anuncio( row.titulo, row.descricao, row.username, row.categoria, row.fechado, row.preco, row.localizacao, row.id);
        }, cb);
};

access.getCountAnnounc = function ( cb) {
    db.SelectOne("SELECT Count(id) as contagem FROM Anuncio where fechado = false ", [],
        function (row) {
            return row.contagem;
        }, cb);
};

access.getAnnouncUser = function(username, cb){
    db.SelectSome("SELECT username, id, titulo, descricao, categoria, fechado, preco, localizacao FROM Anuncio Where username = $1", [username] ,
        function (row) {
            return new access.anuncio( row.titulo, row.descricao, row.username, row.categoria, row.fechado, row.preco, row.localizacao, row.id);
        }, cb);
};

access.getAnnouncFavoriteUser = function(username, cb){
    db.SelectSome("SELECT id, titulo, descricao, Anuncio.username, fechado, categoria, preco, localizacao FROM Anuncio inner join " +
                "AnuncioUtilizadorFavorito on Anuncio.id = id_anuncio Where AnuncioUtilizadorFavorito.username = $1", [username] ,
        function (row) {
            return new access.anuncio( row.titulo, row.descricao, row.username, row.categoria, row.fechado,row.preco, row.localizacao, row.id);
        }, cb);
};

access.getAnnouncFavoriteUserAnn = function(username,id, cb){
    db.SelectSome("SELECT id_anuncio, username FROM AnuncioUtilizadorFavorito Where AnuncioUtilizadorFavorito.username = $1 AND id_anuncio = $2", [username,id] ,
        function (row) {
            return new access.favorito( row.username, row.id_anuncio);
        }, cb);
};

access.getUser = function (name, cb){
    db.SelectOne("SELECT username, email, hash, salt FROM utilizador Where username = $1", [name] ,
        function (row) {
            return new access.user( row.username, row.email, row.hash, row.salt);
        }, cb);
};

access.getUserbyEmail = function (email, cb){
    db.SelectOne("SELECT username, email, hash, salt FROM Utilizador Where email = $1", [email] ,
        function (row) {
            return new access.user( row.username, row.email, row.hash, row.salt);
        }, cb);
};

access.getCategoria = function (desig, cb){
    db.SelectOne("SELECT designacao FROM Categoria Where designacao = $1", [desig] ,
        function (row) {
            return new access.categoria( row.designacao);
        }, cb);
};

access.getComentAnnounc = function (id, cb){
	db.SelectSome("SELECT id, id_anuncio, comentario, username FROM Comentario Where id_anuncio = $1", [id] ,
        function (row) {
            return new access.comment( row.id_anuncio, row.comentario, row.username, row.id);
        }, cb);
};

access.getPontuacaoUtil = function (username, cb){
    db.SelectSome("SELECT username, pontacao FROM PontuacaoUtilizador where username = $1", [username],
    function (row) {
        return new access.pontuacaoUtil(row.username, row.pontacao);
    }, cb);
}

access.getClassifUtil = function (username,vot, cb){
    db.SelectOne("SELECT username, pontacao FROM PontuacaoUtilizador where username = $1 AND votante = $2 ", [username, vot],
        function (row) {
            return new access.pontuacaoUtil(row.username, row.pontacao);
        }, cb);
}

//TODO
access.getAnnounByFilter = function (localizacao, titulo, categoria,  cb){
 /*   db.SelectSome("SELECT id, titulo, descricao, username, fechado, categoria, preco, localizacao " +
                  "FROM anuncio " +
                  "WHERE localizacao = $1 AND (titulo like _$2_ or titulo like $3%) AND categoria = $4", [localizacao, titulo, titulo, categoria],
        function (row) {
            return new access.anuncio(row.titulo, row.descricao, row.username, row.categoria, row.fechado, row.preco, row.localizacao, row.id);
        }, cb);*/
    db.SelectSome("SELECT id, titulo, descricao, username, fechado, categoria, preco, localizacao FROM anuncio WHERE localizacao = $1 ", [localizacao],
        function (row) {
            return new access.anuncio(row.titulo, row.descricao, row.username, row.categoria, row.fechado, row.preco, row.localizacao, row.id);
        }, cb);
}

//funcoes pa criar objects na BD. Chamar callback com o objecto criado
access.newAnnounc = function(announc, cb){
    var params = [announc.titulo, announc.desc, announc.vendedor, announc.categoria, announc.preco, false, announc.localizacao];
    db.ExecuteQuery("INSERT into Anuncio (titulo, descricao, username, categoria, preco, fechado, localizacao) values($1, $2, $3, $4, $5, $6, $7) returning id",
        params,
        function(err, id) {
            if (err)
                return cb(err, null);
            access.getCategoria(announc.categoria,
                        function (err, c){
                            if (err)
                                return cb(err, null);
                            //TODO
                            if (c == undefined)
                                newCategoria(announc.categoria, function(err) {
                                    if (err)
                                        return cb(err, null)
                                });
                            });
            announc.id = id.id;
            return cb(null, announc);
        });
};

access.newPontuser = function(user, pont, vend, cb){
    var params = [vend, pont, user.username];

    db.ExecuteQuery("INSERT into pontuacaoutilizador (username, pontacao, votante) values($1, $2, $3) returning id",
        params,
        cb);
};


access.newAnnouncFavorite = function(announc, user, cb){
    var params = [announc.id, ann.vendedor,user.username];

    db.ExecuteQuery("INSERT into anuncioutilizadorfavorito (id_anuncio, username) values($1, $2)",
        params,
         cb);
};

access.newUser = function(user, cb){
    var params = [user.username, user.hash, user.salt, user.email];
    db.ExecuteQuery("INSERT into utilizador(username, hash, salt, email) values($1, $2, $3, $4)",
        params,
        cb);
};

access.newCategoria = function(designacao, cb){
    var params = [ designacao];
    db.ExecuteQuery("INSERT into categoria (designacao) values( $1 )",
        params,
        cb);
};

access.newComment = function(comment, cb){
    var params = [comment.id_an, comment.comentario, comment.username];
    db.ExecuteQuery("INSERT into Comentario (id_anuncio, comentario, username) values($1, $2, $3) returning id",
        params,
        function(err, id) {
            if (err)
                return cb(err, null);

            access.getAnnounc(comment.id_an,
                    function (err, c){
                        if (err)
                            return cb(err, null);
                    });

            comment.idc = id.id;
            return cb(null, comment);
        });
};
/*id          : req.params.id,
 titulo      : req.body.titulo,
 desc        : req.body.desc,
 preco       : req.body.preco,
 localizacao : req.body.localizacao,
 categoria   : req.body.categoria,
 fechado     : req.body.closed*/
access.updateAnn = function(ann, cb){
    var params = [ann.titulo, ann.desc, ann.categoria, ann.preco, ann.localizacao, ann.fechado, ann.id];
    db.ExecuteQuery("UPDATE anuncio SET titulo = $1, descricao = $2, categoria = $3, preco = $4, localizacao = $5, fechado = $6 WHERE id = $7",
        params,
        cb);
};

access.delAnnounFavorite = function(announc, user, cb){
    var params = [announc.id, user.username];

    db.ExecuteQuery("delete from anuncioutilizadorfavorito where id_anuncio = $1 and username = $2",
        params,
        cb);
};

module.exports = access;