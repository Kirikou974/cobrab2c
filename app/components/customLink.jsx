var React = require('react');

module.exports = class CustomLink extends React.Component{
    render(){
        return (
            <p>{this.props.description} 
                <a href='#' onClick={this.props.handeClick}>
                    {this.props.title}
                </a>
            </p>
        )
    }
}

