var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./dbaccess');
var pass = require('pwd');
var mailer = require('nodemailer');
var mailInfo = require('./config').getEmailInfo();
var crypto = require('crypto');

passport.use(new LocalStrategy(function(username, password, done){
    db.getUser(username, function(err, user) {
      if(err) return done(err);
	  pass.hash(password, user.salt, function(err, hash){
		if(err || hash !== user.hash) return done(null, false);
		console.log("INFO: user", user.username, "has logged in.", user);
		return done(null, user);
	  });
    });
}));

passport.serializeUser(function(user, done) {
  console.log("serializeUser");
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  console.log("deserializeUser");
  db.getUser(username, function(err, user)
  {
    if(err) return done(err);

    user.isAuthenticated = true;	

    return done(null, user);
  });
});

module.exports = function(app)
{
    app.use(function(req, res, next) {
      req.user = req.user || new db.user();
      console.log('USER ' + req.user);
      next();
    });

    app.post('/login', passport.authenticate('local', { successRedirect: 'back',
                                              failureRedirect: '/',
                                              failureFlash: true }));
											  
	app.get('/register', function (req, res, next) {
		if(req.user.username) return res.redirect('/');
		return res.render('register', {user: req.user});
	});
	
	app.post('/register', function (req, res, next) {
		if(req.user.username) return res.redirect('/');
		if(req.body.username === '' || req.body.password === '' || req.body.email === '') {
			return res.redirect('back');
		}
		
		var user = new db.user();
		pass.hash(req.body.password, function(err, salt, hash)  {
			user.username = req.body.username;
			user.salt = salt;
			user.hash = hash;
			user.email = req.body.email;
			user.gestor = false;
			console.log(user);
			db.newUser(user, function(err) {
				if(err) return next(err);
				req.login(user, function(err){
					console.log(err);
					if(err) return res.redirect('/');
					return res.redirect('/queixinhas/dashboard');
			});
		});
		});
		
	});


	app.get('/recover', function(req, res, next) {
		if(req.user.username) return res.redirect('/');
		return res.render('recover');
	});
	
	app.post('/recover', function(req, res, next) {
		if(req.user.username) return res.redirect('/');
		if(req.body.email === '' || req.body.username === ''){
			return res.render('recover', {error: 'email and username cannot be null'});
		}
		db.getUserbyEmail(req.body.email, function(err, user){
			if(err) return res.render('recover', {erro: 'Utilizador our Email invalido'});
			var password = crypto.randomBytes(8).toString('base64');
			pass.hash(password, function(err, salt, hash){
				if(err) return next(err);
				user.salt = salt;
				user.hash = hash;
				db.updatepass(user, function(err){
					var transporter = mailer.createTransport(mailInfo);
					var mailOptions = {
						from: mailInfo.auth.user, // sender address
						to: req.body.email, // list of receivers
						subject: 'Queixinhas na Net: Nova Password', // Subject line
						text: 'A sua nova password é: ' + password // plaintext body
					};
					// send mail with defined transport object
					transporter.sendMail(mailOptions, function(error, info){
						if(error){
							console.log(error);
							return res.render('recover', {err: error.message});
						}else{
							console.log('Message sent: ' + info.response);
						}
						return res.render('recover', {completed:true, email:req.body.email});
					});
				});
			});
		});
	});

    app.get('/logout', function(req, res, next) {
      req.logout();
      return res.redirect('/');
    });
	
	app.post('/logout', function(req, res, next) {
      req.logout();
      return res.redirect('/');
    });
}