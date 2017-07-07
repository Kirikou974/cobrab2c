var React = require('react');

module.exports = class FormError extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      message: 'Input is invalid'
    }
  }

  render(){ 
    if(!this.props.visible)
    {
      return null;
    }
    return (
      <div className="form_error_container visible">
        <span>{this.props.errorMessage}</span>
      </div>
    )
  }

}