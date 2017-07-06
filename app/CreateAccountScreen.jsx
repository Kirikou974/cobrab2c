var React = require('react');
var _ = require('underscore');
//var Select = require('./components/Select');
//var STATES = require('./components/data/states');
var Input = require('./components/Input.jsx');
var Icon = require('./components/Icon.jsx');

module.exports = class CreateAccountScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      companyName: '',
      password: '',
      confirmPassword: '',
      statesValue: '',
      forbiddenWords: ["password", "user", "username"]
    }
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleConfirmPasswordInput = this.handleConfirmPasswordInput.bind(this);
    this.handleCobraCodeInput = this.handleCobraCodeInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.isConfirmedPassword = this.isConfirmedPassword.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
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

  saveAndContinue(e) {
    e.preventDefault();

    var canProceed = this.validateEmail(this.state.email) 
        && !_.isEmpty(this.state.statesValue)
        && this.refs.password.isValid()
        && this.refs.passwordConfirm.isValid();

    if(canProceed) {
      var data = {
        email: this.state.email,
        state: this.state.statesValue
      }
      alert('Thanks.');
    } else {
      this.refs.email.isValid();
      this.refs.cobraCode.isValid();
      this.refs.password.isValid();
      this.refs.passwordConfirm.isValid();
    }
  }

  isConfirmedPassword(event) {
    return (event == this.state.password)
  }

  handleCobraCodeInput(event) {
    this.setState({
      companyName: event.target.value
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

  isEmpty(value) {
    return !_.isEmpty(value);
  }

  updateStatesValue(value) {
    this.setState({
      statesValue: value
    })
  }

  render() {
    return (
      <div className="create_account_screen">

        <div className="create_account_form">
          <h1>Create Azure B2C account</h1>
          <p></p>
          <form onSubmit={this.saveAndContinue}>

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
            />

            <Input 
              text="Cobra Code" 
              ref="cobraCode"
              type="text"
              validate={this.isEmpty}
              value={this.state.cobraCode}
              onChange={this.handleCobraCodeInput} 
              emptyMessage="Cobra code can't be empty"
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
            /> 

            <button 
              type="submit" 
              className="button button_wide">
              CREATE ACCOUNT
            </button>

          </form>
        </div>

      </div>
    );
  }   
};
