var React = require('react');

module.exports = class CustomButton extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <button 
                onClick={this.props.handleClick}
                type={this.props.type ? this.props.type : "submit"}
                className="button button_wide" >
                {this.props.buttonText}
            </button>
        )
    }
}

