import React, { Component } from 'react'
import './LoginContainer.css'

class LoginContainer extends Component {
    render () {
        return (
            <div id="loginDiv">
                <h1>Login</h1>
                <div className="loginForm">
                    <label htmlFor="username" className="loginLabel">Username:</label>
                    <input type="text" id="username" className="loginInput" placeholder="Username"/>
                </div>
                <div className="loginForm">
                    <label htmlFor="password" className="loginLabel">Password:</label>
                    <input type="password" id="password" className="loginInput" placeholder="Password"/>
                </div>

                <div id="loginSubmit">
                    <button type="submit" id="loginBtn">Login</button>
                    <p>Ikke registrert? Klikk her</p>
                </div>
            </div>
        )
    }
}

export default LoginContainer
