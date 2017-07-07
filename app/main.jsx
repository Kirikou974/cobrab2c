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
            renderForm: true,
            formError: false
        }
        this.handleSignUpLinkClick = this.handleSignUpLinkClick.bind(this);
        this.handleSignInLinkClick = this.handleSignInLinkClick.bind(this);  
        this.createAccount = this.createAccount.bind(this);  
    }

    handleSignInLinkClick() {
        this.setState({signIn: true});
    }
    handleSignUpLinkClick() {
        this.setState({signIn: false});
    }
      
    createAccount(data, callback){
        console.log(data);
        var error = true;
        if(error){
            this.setState({
                formError:true
            })
            callback();        
        }
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
            var createAccountButton = React.createElement(customButton,
            {
                buttonText: 'CREATE ACCOUNT'
            });
            var cobraCheckButton = React.createElement(customButton, 
            {
                buttonText: 'VERIFY CODE', 
                type: 'button'
            });
            
            var signInForm = React.createElement(SignInScreen, null, customFormButton, customFormLink);
            var signUpForm = React.createElement(SignUpScreen, { 
                createAccountButton: createAccountButton,
                cobraCheckButton : cobraCheckButton,
                createAccount:this.createAccount,
                formError:this.state.formError
            }, customFormLink);

            baseComponent = this.state.signIn ? signInForm : signUpForm;
        }
        return (
            <div>
                <div className="application_wrapper">
                    <div className="application_routeHandler">
                        {baseComponent}
                    </div>
                </div>
            </div>
        );
    }
}