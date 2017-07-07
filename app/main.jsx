var React = require('react');
var SignInScreen = require('./signInScreen.jsx');
var SignUpScreen = require('./signUpScreen.jsx');
var customButton = require('./components/customButton.jsx')
var customLink = require('./components/customLink.jsx')

module.exports = class MainApp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            signIn: this.props.signIn,
            renderForm: this.props.renderForm
        }
        this.handleSignUpLinkClick = this.handleSignUpLinkClick.bind(this);
        this.handleSignInLinkClick = this.handleSignInLinkClick.bind(this);
    }

    handleSignInLinkClick() {
        this.setState({signIn: true});
    }
    handleSignUpLinkClick() {
        this.setState({signIn: false});
    }

    render() {
        
        var baseComponent = null;
        
        if(this.state.renderForm)
        {
            var customFormButton = React.createElement(customButton, 
            {
                buttonText: this.state.signIn ?  'SIGN IN':'CREATE AN ACCOUNT', 
                handleClick: null
            });
            var customFormLink = React.createElement(customLink, 
            {
                description: this.state.signIn ? 'Need an account? ' : 'Already have an account ? ',
                title:this.state.signIn ? 'Sign up' : 'Sign in',
                handeClick: this.state.signIn ? this.handleSignUpLinkClick : this.handleSignInLinkClick
            })

            var signInForm = React.createElement(SignInScreen, null, customFormButton, customFormLink);
            var signUpForm = React.createElement(SignUpScreen, null, customFormLink);
            baseComponent = this.state.signIn ? signInForm : signUpForm;
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