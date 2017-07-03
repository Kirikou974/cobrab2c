var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var session = require('express-session');
var authOKTA = require('./authOKTA');
var authAZURE = require('./authAzure');
var url = require('url');
var saml2json = require('saml2json');

var app = express();

var port = process.env.port || process.env.PORT || 8080;
app.get('/azure', function(req, res) {
    var clientID = 'aa69bc8f-93d6-45c9-848f-ea3d9efa5c06';
    var authority = 'https://login.microsoftonline.com/tfp/testsdxb2c.onmicrosoft.com/B2C_1_SodexoB2CAPPPolicy';
    var b2cScopes = 'https://testsdxb2c.onmicrosoft.com/sodexob2capp/TestB2C';
    if(port == 8080)
    {
        clientID ='4d74ca44-3825-481f-8ae7-61f1fae9bd30';
        authority ='https://login.microsoftonline.com/tfp/oneshareb2c.onmicrosoft.com/B2C_1_Profile_Create';
        b2cScopes = 'https://oneshareb2c.onmicrosoft.com/TestB2C/TestB2CSCope1';
    }
    res.render('azureb2c.ejs', { 
        clientID: clientID,
        authority: authority,
        b2cScopes: b2cScopes,
        webApi: 'https://fabrikamb2chello.azurewebsites.net/hello'
    });
}).get('/ping', function(req, res){
    res.render('ping.ejs');
}).use(function(req, res, next){
    res.status('404').send('Page introuvable. Essayez /okta, /azure ou /ping');
})

app.listen(port);
