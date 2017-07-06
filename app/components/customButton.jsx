var React = require('react');

module.exports = class CustomButton extends React.Component{
    render(){
        return (
            <button 
              type="submit" 
              className="button button_wide">
              {this.props.buttonText}
            </button>
        )
    }
}

