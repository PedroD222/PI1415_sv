var request = require('request');

var usernamec = "PedroMJD";
var myJSONObject = {'username' : usernamec,
                    'password': 'ola',
                    'email': 'pedroduarte222@gmail.com' };
var uri = 'localhost:3000/register'
request({
    uri: uri,
    method: 'POST',
    json: true,
    body: myJSONObject
}, function (error, response, body){
    console.log(error);
    console.log(response);
});
/*
 titulo char(140) NOT NULL,
 descricao char(140),
 username char(50) NOT NULL,
 fechado boolean NOT NULL,
 categoria char(20)
 */
var ann = {
    'title' : 'Cooler',
    'user': { 'username' : usernamec},
    'cidade': 'Lisboa',
    'categoria' :  'informática'  };

