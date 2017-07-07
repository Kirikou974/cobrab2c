require('babel-register')({
  presets: ['react']
});

var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var request = require('request')
var morgan = require('morgan')
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var config = require('./config')
var mainApp = require('./app/main.jsx')

var port = process.env.PORT || 8080
var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('*', function(req, res) {
    res.status(200).send(
    ReactDOMServer.renderToString(
      React.createElement(mainApp, {signIn:true})
    )
  )
});

//Simule une réponse de cobra
app.post('/api/verifyCode', function(req, res){
  var returnValue = req.body.CobraCode == "12345678" && req.body.SSN == "12345678";
  console.log(returnValue);
  res.json({ codeIsValid: returnValue }); 
})

app.listen(port);