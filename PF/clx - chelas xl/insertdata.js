var request = require('request');

var usernamec = "PedroMJD";
var myJSONObject = {'username' : usernamec,
                    'password': 'ola',
                    'email': 'pedroduarte222@gmail.com' };
var uri = "http://localhost:3005/register";
request.post({url : uri, form: myJSONObject}, function (error, response, body){
    console.log(error);
    console.log(response);
});
console.log("LOGIN username");
var login = {'username' : usernamec, 'password' : myJSONObject.password}
var uriLogin = "http://localhost:3005/login";
request.post( uriLogin).auth( login.username, login.password, false);
/*function (error, response, body){
    console.log("Login "+error);
    console.log("Login "+response);
});*/

/*titulo char(140) NOT NULL,
 descricao char(140),
 username char(50) NOT NULL,
 fechado boolean NOT NULL,
 categoria char(20)
 */
var ann = { 'titulo' : 'Cooler',
            'desc' : 'Bom estado',
            'localizacao': 'Lisboa',
            'categoria' :  'informática',
            'preco' : 100,
            'vendedor': login.username};
var uriann = "http://localhost:3005/announcements/new";
request.post({url : uriann, form: ann}, function (error, response, body){
    console.log("Login"+error);
    console.log("Login"+response);
});