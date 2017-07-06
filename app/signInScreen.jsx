var React = require('react');
var _ = require('underscore');
var Input = require('./components/Input.jsx');

module.exports = class SignInScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.saveAndContinue = this.saveAndContinue.bind(this);
  }

  isEmpty(value) {
    return !_.isEmpty(value);
  }

  saveAndContinue(e) {
    e.preventDefault();
    alert('Thanks.');
  }

  render() {
    return (
      <div className="create_account_screen">
        <div className="create_account_form">
          <h1>Sign In with Azure B2C account</h1>
          <p></p>
          <form onSubmit={this.saveAndContinue}>
            <Input 
              text="Email Address" 
              ref="email"
              type="text"
              validate={this.isEmpty}
              defaultValue={this.state.email} 
              value={this.state.email}
              errorMessage="Email is invalid"
              emptyMessage="Email can't be empty"
              errorVisible={this.state.showEmailError}
            />
            <Input 
              text="Password" 
              type="password"
              ref="password"
              validate={this.isEmpty}
              value={this.state.passsword}
              emptyMessage="Password is invalid"
            /> 
            {this.props.children}
          </form>
        </div>

      </div>
    );
  }   
}; 