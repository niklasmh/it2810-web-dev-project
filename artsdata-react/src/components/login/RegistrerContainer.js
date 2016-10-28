import React, { Component } from 'react'
import './RegistrerContainer.css'

class RegistrerContainer extends Component {
    render () {
        return (
            <div id="registrationDiv">
                <h1>Registrer</h1>
                <div className="registrationForm">
                    <label htmlFor="name" className="registrationLabel">Full name:</label>
                    <input type="text" id="name" className="registrationInput" placeholder="Name"/>
                </div>
                <div className="registrationForm">
                    <label htmlFor="username" className="registrationLabel">Username:</label>
                    <input type="text" id="username" className="registrationInput" placeholder="Username"/>
                </div>
                <div className="registrationForm">
                    <label htmlFor="password" className="registrationLabel">Password:</label>
                    <input type="password" id="password" className="registrationInput" placeholder="Password"/>
                </div>
                <div className="registrationForm">
                    <label htmlFor="password" className="registrationLabel">Repeat password:</label>
                    <input type="password" id="repeatpassword" className="registrationInput" placeholder="Repeat password"/>
                </div>
                <div className="registrationForm">
                    <label htmlFor="email" className="registrationLabel">Email:</label>
                    <input type="email" id="email" className="registrationInput" placeholder="Email"/>
                </div>
                <div className="registrationForm">
                    <label htmlFor="phone" className="registrationLabel">Phone:</label>
                    <input type="number" id="phone" className="registrationInput" placeholder="Phone"/>
                </div>
                <button type="submit" id="loginBtn">Registrer</button>
            </div>
        )
    }
}

export default RegistrerContainer
