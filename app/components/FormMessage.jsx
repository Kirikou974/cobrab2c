var React = require('react');

module.exports = class FormMessage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: this.props.text,
      type: this.props.type
    }
  }

  render(){ 
    if(!this.props.visible)
    {
      return null;
    }
    var formClass= this.props.type == "ERROR" ? "form_error_container visible" : "form_success_container visible"
    return (
      <div>
        <div className={formClass}>
          <span>{this.props.text}</span>
        </div>
        {this.props.children}
      </div>
    )
  }

}