var request = require('request');

var usernamec = "PedroMigJD";
var myJSONObject = {'username' : usernamec,
                    'password': 'ola',
                    'email': 'pedroduarte2222@gmail.com' };

request({
    uri: 'http://pi1415i-li51d-g13.herokuapp.com/register',
    method: 'POST',
    json: true,  
    body: myJSONObject
}, function (error, response, body){
    console.log(error);
    console.log(response);
});
/*
titulo: req.body.title, 
        descricao: req.body.desc,
        autor: req.user.username,
        georef: req.body.geo,
        categorias: req.body.categorias
*/
var queixinha = {
      'title' : 'Teste1',
      'user': { 'username' : usernamec},
      'geo': '',
      'categorias' :  ['PI']  };
request({
    uri: 'http://pi1415i-li51d-g13.herokuapp.com/new',
    method: 'POST',
    json: true,   // <--Very important!!!
    body: queixinha
}, function (error, response, body){
    console.log(error);
    console.log(response);
});

queixinha = {'title' : 'Teste2',
      'user': {'username' : usernamec},
      'geo': '',
      'categorias' :  ['PI']  };
request({
    uri: 'http://pi1415i-li51d-g13.herokuapp.com/register',
    method: 'POST',
    json: true,  
    body: queixinha
}, function (error, response, body){
    console.log(error);
    console.log(response);
});

queixinha = {'title' : 'Teste3',
      'user': {'username' : usernamec},
      'geo': '',
      'categorias' :  ['PI']  };
request({
    uri: 'http://pi1415i-li51d-g13.herokuapp.com/register',
    method: 'POST',
    json: true,  
    body: queixinha
}, function (error, response, body){
    console.log(error);
    console.log(response);
});

queixinha = {'title' : "Teste4",
      'user': {'username' : usernamec},
      'geo': '',
      'categorias' :  ['PI']  };
request({
    uri: 'http://pi1415i-li51d-g13.herokuapp.com/register',
    method: 'POST',
    json: true,  
    body: queixinha
}, function (error, response, body){
    console.log(error);
    console.log(response);
});

queixinha = {'title' : 'Teste5',
      'user': {'username' : usernamec},
      'geo': '',
      'categorias' :  ['PI']  };
request({
    uri: 'http://pi1415i-li51d-g13.herokuapp.com/register',
    method: 'POST',
    json: true,  
    body: queixinha
}, function (error, response, body){
    console.log(error);
    console.log(response);
});


queixinha = {'title' : 'Teste6',
      'user': {'username' : usernamec},
      'geo': '',
      'categorias' :  ['PI']  };
request({
    uri: 'http://pi1415i-li51d-g13.herokuapp.com/register',
    method: 'POST',
    json: true,   
    body: queixinha
}, function (error, response, body){
    console.log(error);
    console.log(response);
});

queixinha = {'title' : 'Teste7',
      'user': {'username' : usernamec},
      'geo': '',
      'categorias' :  ['PI']  };
request({
    uri: 'http://pi1415i-li51d-g13.herokuapp.com/register',
    method: 'POST',
    json: true,  
    body: queixinha
}, function (error, response, body){
    console.log(error);
    console.log(response);
});


queixinha = {'title' : 'Teste8',
      'user': {'username' : usernamec},
      'geo': '',
      'categorias' :  ['PI']  };
request({
    uri: 'http://pi1415i-li51d-g13.herokuapp.com/register',
    method: 'POST',
    json: true,   
    body: queixinha
}, function (error, response, body){
    console.log(error);
    console.log(response);
});

queixinha = {'title' : 'Teste9',
      'user': {'username' : usernamec},
      'geo': '',
      'categorias' :  ['PI']  };
request({
    uri: 'http://pi1415i-li51d-g13.herokuapp.com/register',
    method: 'POST',
    json: true,   
    body: queixinha
}, function (error, response, body){
    console.log(error);
    console.log(response);
});

queixinha = {'title' : 'Teste10',
      'user': {'username' : usernamec},
      'geo': '',
      'categorias' :  ['PI']  };
request({
    uri: 'http://pi1415i-li51d-g13.herokuapp.com/register',
    method: 'POST',
    json: true,   
    body: queixinha
}, function (error, response, body){
    console.log(error);
    console.log(response);
});

queixinha = {'title' : 'Teste11',
      'user': {'username' : usernamec},
      'geo': '',
      'categorias' :  ['PI']  };
request({
    uri: 'http://pi1415i-li51d-g13.herokuapp.com/register',
    method: 'POST',
    json: true,  
    body: queixinha
}, function (error, response, body){
    console.log(error);
    console.log(response);
});