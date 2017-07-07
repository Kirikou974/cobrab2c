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
            accountCreated:false,
            formError: false,
            errorMessage:'',
            loading:false
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
        //console.log(data);
        var error = true;
        this.setState({
            loading:true
        })
        fetch('/api/createuser', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data
            })
        }).then(res => {
            res.json().then(jsonResponse=>{ 
                error = !jsonResponse.accountCreated
                if(error){
                    this.setState({
                        loading: false,
                        formError:true,
                        errorMessage:"Cannot create account"                       
                    })       
                    callback(); 
                }
                else {
                    this.setState({
                        loading: false,
                        signIn:true,
                        accountCreated:true
                    })
                }
            })
        });
    }

    render() {
        var baseComponent = null;

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
            buttonText: 'CREATE ACCOUNT',
            loading: this.state.loading
        });
        var cobraCheckButton = React.createElement(customButton, 
        {
            buttonText: 'VERIFY CODE', 
            type: 'button'
        });

        var signInForm = React.createElement(SignInScreen, { 
            accountCreated:this.state.accountCreated
        }, customFormButton, customFormLink);

        var signUpForm = React.createElement(SignUpScreen, { 
            createAccountButton: createAccountButton,
            cobraCheckButton : cobraCheckButton,
            createAccount:this.createAccount,
            formError:this.state.formError,
            errorMessage: this.state.errorMessage,
            loading: this.state.loading
        }, customFormLink);

        baseComponent = this.state.signIn ? signInForm : signUpForm;
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