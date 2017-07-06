require('babel-register')({
  presets: ['react']
});

var express = require('express')
var path = require('path')
var morgan = require('morgan')
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var config = require('./config')
var mainApp = require('./app/main.jsx')

var port = process.env.PORT || 8080
var app = express()

app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.redirect('/signin');
}).get('/signin', function(req, res){
    res.status(200).send(
    ReactDOMServer.renderToString(
      React.createElement(mainApp, {signIn:true})
    )
  )
}).get('signup', function(req, res){
  res.status(200).send(
    ReactDOMServer.renderToString(
      React.createElement(mainApp, {signUp:true})
    )
  )
})
app.listen(port);