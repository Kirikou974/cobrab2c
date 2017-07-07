var React = require('react');
var _ = require('underscore');
var Input = require('./components/Input.jsx');
var InputError = require('./components/InputError.jsx');
var customButton = require('./components/customButton.jsx')

module.exports = class CreateAccountScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading:false,
      email: '',
      cobraCode: '',
      SSN: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      cobraCodeVerified:false,
      cobraCodeError:false,
      forbiddenWords: ["password", "user", "username"]
    }
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleConfirmPasswordInput = this.handleConfirmPasswordInput.bind(this);
    this.handleCobraCodeInput = this.handleCobraCodeInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.isConfirmedPassword = this.isConfirmedPassword.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.handleCobraCheckButtonClick = this.handleCobraCheckButtonClick.bind(this);
    this.handleSSNInput = this.handleSSNInput.bind(this);
    this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
    this.handleLastNameInput = this.handleLastNameInput.bind(this);
    this.checkCobraCode = this.checkCobraCode.bind(this);
    this.validateCobraCode = this.validateCobraCode.bind(this);
  }

  handlePasswordInput(event) {
    if(!_.isEmpty(this.state.confirmPassword)){
      this.refs.passwordConfirm.isValid();
    }
    this.refs.passwordConfirm.hideError();
    this.setState({
      password: event.target.value
    });
  }

  handleConfirmPasswordInput(event) {
    this.setState({
      confirmPassword: event.target.value
    });
  }

  handleCobraCheckButtonClick(e){
    this.checkCobraCode(e);
  }

  saveAndContinue(e) {
    e.preventDefault();
    console.log('saveAndContinue');
    var canProceed = this.validateEmail(this.state.email) 
        && !_.isEmpty(this.state.cobraCode)
        && !_.isEmpty(this.state.SSN)
        && this.state.cobraCodeVerified
        && this.refs.password.isValid()
        && this.refs.passwordConfirm.isValid();

    if(canProceed) {
      var data = {
        email: this.state.email,
        SSN: this.state.SSN,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password,
        cobraCode: this.state.cobraCode
      }
      this.setState({
        loading:true
      })
      console.log(data);
    } else {
      this.refs.email.isValid();
      this.refs.SSN.isValid();
      this.refs.cobraCode.isValid();
      this.refs.lastName.isValid();
      this.refs.firstName.isValid();
      this.refs.password.isValid();
      this.refs.passwordConfirm.isValid();
    }
  }

  //Simule un appel vers cobra
  checkCobraCode(e){
    this.setState({
      loading:true
    })
    fetch('/api/verifyCode', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        SSN: this.state.SSN,
        CobraCode: this.state.cobraCode,
      })
    }).then(res => {
      res.json().then(jsonResponse=>{ 
        console.log(jsonResponse);
        this.setState({
          cobraCodeError:!jsonResponse.codeIsValid,
          cobraCodeVerified: jsonResponse.codeIsValid,
          loading: false
        })
        this.refs.SSN.setValidity(jsonResponse.codeIsValid);
        this.refs.cobraCode.setValidity(jsonResponse.codeIsValid);
      })
    });
  }

  isConfirmedPassword(event) {
    return (event == this.state.password)
  }

  handleCobraCodeInput(event) {
    this.setState({
      cobraCode: event.target.value
    })
  }

  handleSSNInput(event) {
    this.setState({
      SSN: event.target.value
    })
  }
  
  handleLastNameInput(event){
    this.setState({
      lastName: event.target.value
    })
  }

  handleFirstNameInput(event){
    this.setState({
      firstName: event.target.value
    })
  }

  handleEmailInput(event){
    this.setState({
      email: event.target.value
    });
  }

  validateEmail(event) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(event);
  }

  validateCobraCode(event){
    return (!_.isEmpty(this.state.cobraCode));
  }

  validateSSN(event){
    var re = /^(?!\s*$)[0-9\s]{8}$/;
    return re.test(event);
  }

  isEmpty(value) {
    return !_.isEmpty(value);
  }

  render() {
      var cobraCheckButton = this.state.cobraCodeVerified ? null : React.createElement(customButton, 
      {
          buttonText: 'VERIFY CODE', 
          handleClick: this.handleCobraCheckButtonClick,
          type: 'button',
      });
      var createAccountButton = this.state.cobraCodeVerified ? React.createElement(customButton,
      {
          buttonText: 'CREATE ACCOUNT', 
          handleClick: null,
          disabled: this.state.loading
      }) : null;

    return (
      <div className="create_account_screen">

        <div className="create_account_form">
          <h1>Sign Up</h1>
          <p></p>
          <form onSubmit={this.saveAndContinue}>
            <Input 
              text="Social security number" 
              ref="SSN"
              type="text"
              defaultValue={this.state.SSN} 
              validate={this.validateSSN}
              value={this.state.SSN}
              onChange={this.handleSSNInput} 
              errorMessage="SSN is invalid"
              emptyMessage="SSN can't be empty"
              disabled={this.state.cobraCodeVerified || this.state.loading}
            />
            <Input 
              text="Cobra Code" 
              ref="cobraCode"
              type="password"
              validate={this.validateCobraCode}
              value={this.state.cobraCode}
              onChange={this.handleCobraCodeInput} 
              errorMessage="Cobra code is invalid"
              emptyMessage="Cobra code can't be empty"
              disabled={this.state.cobraCodeVerified}
            /> 
            {cobraCheckButton}
            <Input 
              text="Email Address" 
              ref="email"
              type="text"
              defaultValue={this.state.email} 
              validate={this.validateEmail}
              value={this.state.email}
              onChange={this.handleEmailInput} 
              errorMessage="Email is invalid"
              emptyMessage="Email can't be empty"
              errorVisible={this.state.showEmailError}
              disabled={!this.state.cobraCodeVerified || this.state.loading}
            />
            <Input 
              text="First name" 
              ref="firstName"
              type="text"
              defaultValue={this.state.firstName} 
              validate={this.isEmpty}
              value={this.state.firstName}
              onChange={this.handleFirstNameInput} 
              emptyMessage="First name can't be empty"
              errorVisible={this.state.showFirstNameError}
              disabled={!this.state.cobraCodeVerified || this.state.loading}
            />
            <Input 
              text="Last name" 
              ref="lastName"
              type="text"
              defaultValue={this.state.lastName} 
              validate={this.isEmpty}
              value={this.state.lastName}
              onChange={this.handleLastNameInput} 
              emptyMessage="Last name can't be empty"
              errorVisible={this.state.showLastNameError}
              disabled={!this.state.cobraCodeVerified || this.state.loading}
            />
            <Input 
              text="Password" 
              type="password"
              ref="password"
              validator="true"
              minCharacters="8"
              requireCapitals="1"
              requireNumbers="1"
              forbiddenWords={this.state.forbiddenWords}
              value={this.state.passsword}
              emptyMessage="Password is invalid"
              onChange={this.handlePasswordInput} 
              disabled={!this.state.cobraCodeVerified || this.state.loading}
            /> 

            <Input 
              text="Confirm password" 
              ref="passwordConfirm"
              type="password"
              validate={this.isConfirmedPassword}
              value={this.state.confirmPassword}
              onChange={this.handleConfirmPasswordInput} 
              emptyMessage="Please confirm your password"
              errorMessage="Passwords don't match"
              disabled={!this.state.cobraCodeVerified || this.state.loading}
            /> 
            {createAccountButton}
            {this.props.children}
          </form>
        </div>
      </div>
    );
  }   
};
