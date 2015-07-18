var db = require('./dbUtility');

var access = {};

access.anuncio = function anuncio(/*to implement*/)
{
	
}

access.user = function utilizador(/**/)
{
	
}

access.comment = function comentario()
{
	
}

access.categoria = function categoria()
{
	
}

access.getAnnouncs = function (page, cb){
	//return lista de anuncios, pagina page
	
};

access.getAnnounc = function (id, cb) {
	
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