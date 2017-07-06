var React = require('react');
var SignInScreen = require('./signInScreen.jsx');
var SignUpScreen = require('./signUpScreen.jsx');
var customButton = require('./components/customButton.jsx')

module.exports = class MainApp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            signIn: this.props.signIn,
            signUp: this.props.signUp,
            renderForm: this.props.renderForm
        }
    }

    handleSignInButtonClick() {
        this.setState({signIn: true, signUp:false});
    }
    handleSignUpButtonClick() {
        this.setState({signIn: false, signUp:true});
    }

    render() {
        
        var baseComponent = null;
        
        if(this.state.renderForm)
        {
            var signInButton = React.createElement(customButton, {buttonText:"SIGN IN", action:"/signin"});
            var signUpButton = React.createElement(customButton, {buttonText:"SIGN UP", action:"/signup"});

            if(this.state.signIn)
            {
                baseComponent = React.createElement(SignInScreen, null, signInButton, signUpButton);
            }
            if(this.state.signUp)
            {
                baseComponent = React.createElement(SignInScreen, null, signUpButton, signInButton);
            }
        }
        
        return (
            <html>
                <head>
                    <link rel="stylesheet"  href='/application.css'/>
                </head>
                <body>
                    <div className="application_wrapper">
                        <div className="application_routeHandler">
                            <div id='app'>
                                {baseComponent}
                            </div>
                        </div>
                    </div>
                    <script src='/bundle.js'/>
                </body>
            </html>
        );
    }
}