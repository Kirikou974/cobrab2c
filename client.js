var React = require('react');
var ReactDOM = require('react-dom');
var mainApp = require('./app/main.jsx')

ReactDOM.render(React.createElement(mainApp, {signIn:true }) , document.getElementById('app'));