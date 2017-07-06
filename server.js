require('babel-register')({
  presets: ['react']
});

var express = require('express');
var request = require('request');
var morgan = require('morgan')
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Body = require('./app/body.jsx');
var config = require('./config');

var app = express();
var signup = 'signup';
var verifyCobraCode = 'verifyCobraCode';

app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
  var html = ReactDOMServer.renderToString(
    React.createElement(Body)
  )
  res.send(html);
});

var port = process.env.port || process.env.PORT || 8080;
app.listen(port);