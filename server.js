require('babel-register')({
  presets: ['react']
});

var express = require('express');
var request = require('request');
var morgan = require('morgan')
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var SignInComponent = require('./containers/signin.jsx');
var config = require('./config');

var app = express();
var signin = 'signin';
var signup = 'signup';
var verifyCobraCode = 'verifyCobraCode';

app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.redirect('/' + signin);
}).get('/' + signin,function(req, res) {
  /*var html = ReactDOMServer.renderToString(
    React.createElement(SignInComponent)
  )*/
  var html = "<div id='app'></div>";
  res.send(html);
}).post('/' + signin, function(req, res) {
  res.send('Sign in');
}).get('/' + signup, function(req, res) {
  res.render(signup, { 
    formTitle:'Sign up',
    formAction:'/' + signup
  });
}).post('/' + verifyCobraCode, function(req, res){
  res.send('ok');
  //call to cobra service with SSN + activation code
});

var port = process.env.port || process.env.PORT || 8080;
app.listen(port);