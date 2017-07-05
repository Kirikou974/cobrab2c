var React = require('react');

module.exports = class AlertComponent extends React.Component {
    render(){
        return <div className="alert alert-danger">{this.props.message}</div>
    }
}