var db = require('./dbUtility');

var access = {};

/*
CREATE TABLE Anuncio
 (
 titulo char(140) NOT NULL,
 descricao char(140),
 username char(50) NOT NULL,
 pontuacao_anuncio int,
 id int NOT NULL DEFAULT nextval('"anuncio_ID_seq"'::regclass),
 fechado boolean NOT NULL,
 categoria char(20)
 )*/
access.anuncio = function anuncio(titulo, desc, vendedor, categoria, fechado, preco,localizacao, id)
{
	this.id = id;
    this.titulo = titulo;
    this.desc = desc;
    this.preco = preco;
    this.vendedor = vendedor;
    this.categoria = categoria;
    this.fechado = fechado;
    this.localizacao = localizacao;
}

/*CREATE TABLE Utilizador
 (
 username char(50) NOT NULL,
 email char(50) NOT NULL,
 gestor boolean NOT NULL,
 hash text NOT NULL,
 salt text NOT NULL,*/
access.user = function utilizador(username, email, gestor, hash, salt)
{
	this.username = username;
    this.email = email;
    this.gestor = gestor;
    this.hash = hash;
    this.salt = salt;
}

/*
* CREATE TABLE Comentario
 (
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

/*CREATE TABLE Categoria
 (
 designacao char(20) NOT NULL,
 CONSTRAINT "pkCat" PRIMARY KEY (designacao)
 )*/
access.categoria = function categoria(desig)
{
	this.desig = desig;
}
/*CREATE TABLE AnuncioUtilizadorFavorito
(
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
    pontacao int not null,
    CONSTRAINT "fkUsername_PontuacaoUtilizador"
FOREIGN KEY (username) REFERENCES Utilizador (username)
MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
)*/
access.pontuacaoUtil = function(username, pontuacao, id){
    this.username = username;
    this.pontuacao = pontuacao;
    this.id = id;
}
/*
 CREATE TABLE Anuncio
 (
 titulo char(140) NOT NULL,
 descricao char(140),
 username char(50) NOT NULL,
 pontuacao_anuncio int,
 id int NOT NULL DEFAULT nextval('"anuncio_ID_seq"'::regclass),
 fechado boolean NOT NULL,
 categoria char(20)
 )
 function anuncio(titulo, desc, vendedor, categoria, fechado, preco, id)*/
access.getAnnouncs = function (page, cb){
	//return lista de anuncios, pagina page
    var offset = (page-1) * 10;
	db.SelectAll("SELECT id, titulo, descricao, username, fechado, categoria, preco, localizacao FROM Anuncio ORDER BY id DESC LIMIT 10 OFFSET "+offset ,
    function (row) {
        return new access.anuncio( row.titulo, row.descricao, row.username, row.categoria, row.fechado, row.preco, row.localizacao, row.id);
    }, cb);
};

access.getAnnounc = function (id, cb) {
    db.SelectOne("SELECT id, titulo, descricao, username, fechado, categoria, preco FROM Anuncio Where id = $1", [id] ,
        function (row) {
            return new access.anuncio( row.titulo, row.descricao, row.username, row.categoria, row.fechado, row.preco, row.localizacao, row.id);
        }, cb);
};

access.getCountAnnounc = function ( cb) {
    db.SelectOne("SELECT Count(id) as contagem FROM Anuncio ", [] ,
        function (row) {
            return row.contagem;
        }, cb);
};

access.getAnnouncUser = function(user, cb){
    db.SelectSome("SELECT username, id, titulo, descricao, categoria, fechado, preco, localizacao FROM Anuncio Where username = $1", [user] ,
        function (row) {
            return new access.anuncio( row.titulo, row.descricao, row.username, row.categoria, row.fechado, row.preco, row.localizacao, row.id);
        }, cb);
};

access.getAnnouncFavoriteUser = function(user, cb){
    db.SelectSome("SELECT id, titulo, descricao, Anuncio.username, fechado, categoria, preco, localizacao FROM Anuncio inner join " +
                "AnuncioUtilizadorFavorito on (Anuncio.id = id_anuncio ) Where AnuncioUtilizadorFavorito.username = $1", [user] ,
        function (row) {
            return new access.anuncio( row.titulo, row.descricao, row.username, row.categoria, row.fechado,row.preco, row.localizacao, row.id);
        }, cb);
};

access.getUser = function (name, cb){
    db.SelectOne("SELECT username, email, gestor, hash, salt FROM utilizador Where username = $1", [name] ,
        function (row) {
            return new access.user( row.username, row.email, row.gestor, row.hash, row.salt);
        }, cb);
};

access.getUserbyEmail = function (email, cb){
    db.SelectOne("SELECT username, email, gestor, hash, salt FROM Utilizador Where email = $1", [email] ,
        function (row) {
            return new access.user( row.username, row.email, row.gestor, row.hash, row.salt);
        }, cb);
};

access.getCategoria = function (d, cb){
    db.SelectOne("SELECT designacao FROM Categoria Where designacao = $1", [d] ,
        function (row) {
            return new access.categoria( row.designacao);
        }, cb);
};

access.getComentAnnounc = function (id, cb){
	db.SelectSome("SELECT id, id_anuncio, comentario, username FROM Comentario Where id_anuncio = $1", [id] ,
        function (row) {
            return new access.coment( row.id_anuncio, row.comentario, row.username, row.id);
        }, cb);
};
//row.username n existe e onnome da tabela n se poe TODO atençao
access.getPontuacaoUtil = function (username, cb){
    db.SelectSome("SELECT username, pontuacao FROM PontuacaoUtilizador where username = $1", [username],
    function (row) {
        return new access.pontuacaoUtil(row.username, row.pontuacao);
    }, cb);
}

access.getAnuncioByLocalizacao = function (localizacao, cb){
    db.SelectSome("SELECT id, titulo, descricao, username, fechado, categoria, preco, localizacao FROM anuncio where localizacao = $1", [localizacao],
        function (row) {
            return new access.newAnnounc(row.titulo, row.descricao, row.vendedor, row.categoria, row.fechado, row.preco, row.localizacao);
        }, cb);
}

access.getAnuncioByTitulo = function (titulo, cb){
    db.SelectSome("SELECT id, titulo, descricao, username, fechado, categoria, preco, localizacao FROM anuncio where titulo like _$1_ or titulo like $2%", [titulo, titulo],
        function (row) {
            return new access.newAnnounc(row.titulo, row.descricao, row.vendedor, row.categoria, row.fechado, row.preco, row.localizacao);
        }, cb);
}

access.getAnuncioByCategoria = function (categoria, cb){
    db.SelectSome("SELECT id, titulo, descricao, username, fechado, categoria, preco, localizacao FROM anuncio where titulo = $1", [categoria],
        function (row) {
            return new access.newAnnounc(row.titulo, row.descricao, row.vendedor, row.categoria, row.fechado, row.preco, row.localizacao);
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

access.newUser = function(user, cb){

    var params = [user.username, user.hash, user.salt, user.email, false];
    db.ExecuteQuery("INSERT into utilizador(username, hash, salt, email, gestor) values($1, $2, $3, $4, $5)",
        params,
        function(err) {
            if (err)
                return cb(err);
            return cb(null, user);
        });
};

access.newCategoria = function(designacao, cb){
    var params = [ designacao];
    db.ExecuteQuery("INSERT into categoria (designacao) values( $1 )",
        params,
        function(err) {
            if (err)
                return cb(err);

            return cb(null, designacao);
        });
};

access.newComment = function(comment, cb){
    var params = [comment.id_an, comment.comentario, comment.username];
    db.ExecuteQuery("INSERT into Comentario (id_anuncio, comentario, username) values($1, $2) returning id",
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

module.exports = access;