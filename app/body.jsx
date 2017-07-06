var React = require('react');

module.exports = class App extends React.Component {
  render() {
    return (
      <html>
        <head>
          <link rel="stylesheet"  href='/application.css'/>
        </head>
        <body>
            <div id='app'>
            </div>
            <script src='/bundle.js'/>
        </body>
      </html>
    );
  } 
};