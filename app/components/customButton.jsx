var React = require('react');

module.exports = class CustomButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            disabled: this.props.disabled
        }

    }
    render(){
        var disabled = this.state.disabled ? "disabled='disabled'" : '';

        return (
            <button 
                onClick={this.props.handleClick}
                type={this.props.type ? this.props.type : "submit"}
                className="button button_wide" {...this.props}>
                {this.props.buttonText}
            </button>
        )
    }
}

