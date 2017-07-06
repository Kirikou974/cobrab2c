var React = require('react');
var classNames = require('classnames'); 
var _ = require('underscore');

var cx = classNames;

module.exports = class InputError extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      message: 'Input is invalid'
    }
  }

  render(){ 
    var errorClass = cx({
      'error_container':   true,
      'visible':           this.props.visible,
      'invisible':         !this.props.visible
    });

    return (
      <div className={errorClass}>
        <span>{this.props.errorMessage}</span>
      </div>
    )
  }

}