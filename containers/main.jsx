var React = require('react');
var AlertComponent = require('../components/alert.jsx')
var TitleComponent = require('../components/title.jsx')
module.exports = class Main extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" />
                    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" />
                    <link rel="stylesheet" href="/style.css" />
                </head>
                <body>
                    <div className="container">
                        <div className="text-center">
                            <h1><span className="fa"></span>AZURE Authentication</h1>
                        </div>
                        <div className="col-sm-6 col-sm-offset-3">
                            <TitleComponent title={this.props.title}/>
                            <AlertComponent message='Test' />
                            {this.props.children}
                        </div>
                    </div>
                    <script src='/bundle.js' />
                </body>
            </html>
        );
    }
}
