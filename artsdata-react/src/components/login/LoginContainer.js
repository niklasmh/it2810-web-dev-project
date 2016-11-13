import React, { Component } from 'react'
import { Link, IndexLink, browserHistory } from 'react-router'
import './LoginContainer.css'
class LoginContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            status: ''
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)

    }

    handleUsernameChange (event) {
        this.state.username = event.target.value
    }

    handlePasswordChange (event) {
        this.state.password = event.target.value
    }

    handleLogin(){
        fetch('/api/users/login', {method: 'POST', headers: {'Content-Type': 'application/json'},  body:JSON.stringify(this.state)})
            .then((response) => {
                return response
            })
            .then((data) => {
                if(data.status == 200){
                    this.setState(Object.assign({}, this.state, { status: 'Successful login' }))
                    localStorage['user'] = this.state.username
                }
                if(data.status == 404){
                    this.setState(Object.assign({}, this.state, { status: 'User or password does not match' }))
                }
            })
            .catch((error) => {
            }).then(() => {
              if (this.state.status === 'Successful login') {
                setTimeout(function () {
                  browserHistory.push('/')
                }, 1500)
              }
            })
    }

    render () {
    return (
      <div id="loginDiv">
        <h1>Login</h1>
        <div className="loginForm">
          <label htmlFor="username" className="loginLabel">Username:</label>
          <input type="text" id="username" className="loginInput" placeholder="Username" onChange={this.handleUsernameChange}/>
        </div>
        <div className="loginForm">
          <label htmlFor="password" className="loginLabel">Password:</label>
          <input type="password" id="password" className="loginInput" placeholder="Password" onChange={this.handlePasswordChange}/>
        </div>

        <div id="loginSubmit">
          <button type="submit" id="loginBtn" onClick={this.handleLogin}>Login</button>
          <Link to="/registrer">Registrer deg her</Link>
        </div>
          <p>{this.state.status}</p>
      </div>
  )
  }
}

export default LoginContainer
