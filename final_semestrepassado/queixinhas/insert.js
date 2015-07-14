var pass = require('pwd');
var http = require('http')

function cnuser (req, res, email, g) {
		var user = new db.user();
		user.username = req;
		user.email = email;
		user.gestor = g;
		console.log('username, email, gestor');
		if(req.user) return res.redirect('/');
		if(req === '' || res === '' || email === '') {
			res.flash('Please fill out all fields');
			return res.render('/register');
		}
		pass.hash(res, function(err, salt, hash)  {
			//var user = new db.user()
			user.salt = salt;
			user.hash = hash;
		
		console.log('JA TEM HASHSALT')
		db.newUser(user, function(err, user) {
			if(err) 
				console.log(err);
				//next('router');
			//return res.redirect('/');
			console.log ('Sucesso');
		});
		});
		console.log('CRIOU')
};

cnuser("Pedro2","ped", "a3683@alunos.isel.pt", true);
cnuser("Miguel2","mig", "a3686@alunos.isel.pt", true);
cnuser("Luz2","luz", "a3691@alunos.isel.pt", true);

var q = new db.queixinha();
q.titulo = "Trab PI";
q.autor = "Pedro2";
q.fechada = false;

var idqueix;
var idcategoria;
var comment;

db.newQueixinha(q, function(err, id){
						idqueix = id;
						console.log("IDDDQQQQQ"+idqueix)
						console.log(err);

	
	comment = new db.comment(0, idqueix,  "Not Finished", "Miguel2");

	db.newComment(comment, function(err){
						console.log(err);
	comment = new db.comment(0, idqueix, "FDS","Luz2");

	db.newComment(comment, function(err){
						console.log(err);

	});
});
});

q.titulo = "Servidor";
q.autor = "Miguel2";
q.fechada = false;
console.log(q)

db.newQueixinha(q, function(err, id){
	idqueix = id;
	console.log(err);

	comment = new db.comment(0, idqueix, "FDS", "Luz2");

	db.newComment(comment, function(err){
						console.log(err);
	});

	db.newCategoriaQueixinha(idcategoria, idqueix, function(err){
													console.log(err)
												});
});

q.titulo = "BOOTSTRAP ?!! N WORK";
q.autor = "Luz2";
q.fechada = false;
console.log(q);
db.newQueixinha(q, function(err, id){
					idqueix = id;
					console.log(err);

		comment = new db.comment(0, idqueix,"FDS", "Miguel2");

		db.newComment(comment, function(err){
								console.log(err);
		});

		db.newCategoriaQueixinha(idcategoria, idqueix, function(err){
														console.log(err)
														});
});