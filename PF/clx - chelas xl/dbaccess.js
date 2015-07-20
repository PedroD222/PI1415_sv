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
access.anuncio = function anuncio(titulo, desc, vendedor, categoria, fechado, pont, id)
{
	this.id = id;
    this.titulo = titulo;
    this.desc = desc;
    this.vendedor = vendedor;
    this.categoria = categoria;
    this.fechado = fechado;
    this.pont = pont;

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
access.getAnnouncs = function (page, cb){
	//return lista de anuncios, pagina page
    var offset = (page-1) * 10;
	db.SelectAll("SELECT id, titulo, descricao, username, pontuacao_anuncio, fechado, categoria FROM Anuncio ORDER BY id DESC LIMIT 10 OFFSET "+offset ,
    function (row) {
        return new access.anuncio( row.titulo, row.descricao, row.username, row.categoria, row.fechado, row.pontuacao_anuncio, row.id);
    }, cb);
};

access.getAnnounc = function (id, cb) {
    db.SelectOne("SELECT id, titulo, descricao, username, pontuacao_anuncio, fechado, categoria FROM Anuncio Where id = "+id ,
        function (row) {
            return new access.anuncio( row.titulo, row.descricao, row.username, row.categoria, row.fechado, row.pontuacao_anuncio, row.id);
        }, cb);
};

access.getAnnouncUser = function(user, cb){
    db.SelectSome("SELECT username, email, gestor , hash, salt FROM Anuncio Where usernane = "+user ,
        function (row) {
            return new access.anuncio( row.titulo, row.descricao, row.username, row.categoria, row.fechado, row.pontuacao_anuncio, row.id);
        }, cb);
};

access.getAnnouncFavoriteUser = function(user, cb){
    db.SelectSome("SELECT id, titulo, descricao, username, pontuacao_anuncio, fechado, categoria FROM Anuncio inner join " +
                "AnuncioUtilizadorFavorito on (Anuncio.id = id_anuncio ) Where AnuncioUtilizadorFavorito.usernane = "+user ,
        function (row) {
            return new access.anuncio( row.titulo, row.descricao, row.username, row.categoria, row.fechado, row.pontuacao_anuncio, row.id);
        }, cb);
};

access.getUser = function (name, cb){
    db.SelectOne("SELECT username, email, gestor, hash, salt FROM Utilizador Where username = "+name ,
        function (row) {
            return new access.user( row.username, row.email, row.gestor, row.hash, row.salt);
        }, cb);
};

access.getUserbyEmail = function (email, cb){
    db.SelectOne("SELECT username, email, gestor, hash, salt FROM Utilizador Where email = "+email ,
        function (row) {
            return new access.user( row.username, row.email, row.gestor, row.hash, row.salt);
        }, cb);
};

access.getComentAnnounc = function (id, cb){
	//return comentarios de anuncio id
		
};

//funcoes pa criar objects na BD. Chamar callback com o objecto criado
access.newAnnounc = function(announc, cb){
	
};

access.newUser = function(user, cb){
	
};

access.newCategoria = function(designacao, cb){
	
};

access.newComment = function(comment, cb){
	
};

module.exports = access;