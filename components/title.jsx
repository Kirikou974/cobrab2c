var React = require('react');

module.exports = class TitleComponent extends React.Component{
    render(){
        return <h1><span className="fa fa-sign-in"></span> {this.props.title}</h1>
    }
}