var db = require('./dbUtility');

var access = {};
/*
* CREATE TABLE Utilizador
 (
 username char(50) NOT NULL,
 email char(50) NOT NULL,
 gestor boolean NOT NULL,
 hash text NOT NULL,
 salt text NOT NULL,
 CONSTRAINT user_pkey PRIMARY KEY (username),
 CONSTRAINT unemail UNIQUE (email)
 )
 WITH (
 OIDS=FALSE
 );
 ALTER TABLE Utilizador
 OWNER TO ClxSuperUser;

 CREATE TABLE Categoria
 (
 designacao char(20) NOT NULL,
 CONSTRAINT "pkCat" PRIMARY KEY (designacao)
 )
 WITH (
 OIDS=FALSE
 );
 ALTER TABLE Categoria
 OWNER TO ClxSuperUser;


 WITH (
 OIDS=FALSE
 );
 ALTER TABLE Anuncio
 OWNER TO ClxSuperUser;

 CREATE TABLE AnuncioUtilizadorFavorito
 (
 username char(50) NOT NULL,
 id_anuncio int NOT NULL DEFAULT nextval('"Comentario_Id_anuncio_seq"'::regclass),
 CONSTRAINT "pkAnuncio" PRIMARY KEY (username, id_anuncio),
 CONSTRAINT "fkUsername_AnuncioUtilizadorFavorito" FOREIGN KEY (username)
 REFERENCES Utilizador (username) MATCH SIMPLE
 ON UPDATE NO ACTION ON DELETE NO ACTION
 CONSTRAINT "fkAnuncio_AnuncioUtilizadorFavorito" FOREIGN KEY (id_anuncio)
 REFERENCES Anuncio (id) MATCH SIMPLE
 ON UPDATE NO ACTION ON DELETE NO ACTION
 )
 WITH (
 OIDS=FALSE
 );
 ALTER TABLE AnuncioUtilizadorFavorito
 OWNER TO ClxSuperUser;

 CREATE TABLE Comentario
 (
 id_comentario int NOT NULL DEFAULT nextval('"Comentario_Id_seq"'::regclass),
 id_anuncio int NOT NULL DEFAULT nextval('"Comentario_Id_anuncio_seq"'::regclass),
 comentario char(140) NOT NULL,
 username char(50) NOT NULL,
 CONSTRAINT "pkComentario" PRIMARY KEY (id, id_anuncio),
 CONSTRAINT "fkAnuncio_comentario" FOREIGN KEY (id_anuncio)
 REFERENCES Anuncio (id) MATCH SIMPLE
 ON UPDATE NO ACTION ON DELETE NO ACTION,
 CONSTRAINT "fkUsername_comentario" FOREIGN KEY (username)
 REFERENCES Utilizador (username) MATCH SIMPLE
 ON UPDATE NO ACTION ON DELETE NO ACTION
 )
 */
/*
* CREATE TABLE Anuncio
 (
 titulo char(140) NOT NULL,
 descricao char(140),
 username char(50) NOT NULL,
 pontuacao_anuncio int,
 id int NOT NULL DEFAULT nextval('"anuncio_ID_seq"'::regclass),
 fechado boolean NOT NULL,
 categoria char(20),
 CONSTRAINT "pkAnuncio" PRIMARY KEY (id),
 CONSTRAINT "fkUsername_anuncio" FOREIGN KEY (username)
 REFERENCES Utilizador (username) MATCH SIMPLE
 ON UPDATE NO ACTION ON DELETE NO ACTION
 CONSTRAINT "fkCat_anuncio" FOREIGN KEY (designacao)
 REFERENCES Categoria (designacao) MATCH SIMPLE
 ON UPDATE NO ACTION ON DELETE NO ACTION
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

access.user = function utilizador(/**/)
{
	
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

access.getAnnouncs = function (page, cb){
	//return lista de anuncios, pagina page
	
};

access.getAnnounc = function (id, cb) {
	
};

access.getAnnouncUser = function(user, cb){
	
};

access.getAnnouncFavoriteUser = function(user, cb){
	
};

access.getUser = function (name, cb){
	
};

access.getUserbyEmail = function (email, cb){
		
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