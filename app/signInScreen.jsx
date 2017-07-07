var React = require('react');
var _ = require('underscore');
var Input = require('./components/Input.jsx');
var FormMessage = require('./components/FormMessage.jsx');

module.exports = class SignInScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      accountCreated:this.props.accountCreated,
      loading:false
    }
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);

  }

  isEmpty(value) {
    return !_.isEmpty(value);
  }
  handleEmailInput(event){
    this.setState({
      email: event.target.value
    });
  }
  handlePasswordInput(event) {
    this.setState({
      password: event.target.value
    });
  }
  saveAndContinue(e) {
    e.preventDefault();
    this.setState({
      loading:true,
      accountCreated:false
    })
    this.props.signInAccount({
      email: this.state.email,
      password: this.state.password
    }, this.signInCallback);
  }
  signInCallback(data){
    this.setState({
      loading:false
    })
  }

  render() {
    
    return (
      <div className="create_account_screen">
        <div className="create_account_form">

          <h1>Sign In</h1>
          <p></p>
          <FormMessage
            text="Account Created"
            type="SUCCESS"
            visible={this.state.accountCreated}>
            <p></p>
          </FormMessage>
          <form onSubmit={this.saveAndContinue}>
            <Input 
              text="Email Address" 
              ref="email"
              type="text"
              validate={this.isEmpty}
              defaultValue={this.state.email} 
              value={this.state.email}
              onChange={this.handleEmailInput} 
              errorMessage="Email is invalid"
              emptyMessage="Email can't be empty"
              errorVisible={this.state.showEmailError}
              hideValidationIcons={true}
            />
            <Input 
              text="Password" 
              type="password"
              ref="password"
              validate={this.isEmpty}
              value={this.state.passsword}
              onChange={this.handlePasswordInput} 
              emptyMessage="Password can't be empty"
              hideValidationIcons={true}
            /> 
            {this.props.children}
          </form>
        </div>

      </div>
    );
  }   
}; 