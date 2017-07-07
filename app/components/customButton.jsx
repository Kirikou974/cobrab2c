var React = require('react');

module.exports = class CustomButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading:this.props.loading
        }
    }
    render(){
        if(this.props.loading){
            return (
                <div className='img_wide'>
                    <img className='img_wide' src='/spinner2.gif'/>
                </div>
            )
        }
        else{
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
}

