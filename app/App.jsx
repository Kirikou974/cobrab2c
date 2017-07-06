var React = require('react');
var CreateAccountScreen = require('./CreateAccountScreen.jsx');

module.exports = class App extends React.Component {
  render() {
    return (
      <div>
        <div className="application_wrapper">

          <div className="application_routeHandler">
              <CreateAccountScreen/>
          </div>
          
        </div>
        <script src='/bundle.js'/>
      </div>
    );
  } 
};