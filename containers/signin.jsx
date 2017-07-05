var React=require('react');
var Main = require('./main.jsx');

module.exports = class SignIn extends React.Component {
    render(){
        return (
            <Main title='Sign In'>
                <div>
                    <form action="/signin" method="post">
                            <div className="form-group">
                                <label>SSN</label>
                                <input type="text" className="form-control" name="ssn"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password"/>
                            </div>
                            <button type="submit" className="btn btn-warning btn-lg">Login</button>
                    </form>
                    <hr/>
                    <p>Need an account? <a href="/signup">Signup</a></p>
                </div>
            </Main>
        )
    }

}