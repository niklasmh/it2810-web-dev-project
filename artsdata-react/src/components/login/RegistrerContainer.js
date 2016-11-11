import React, { Component } from 'react'
import './RegistrerContainer.css'

class RegistrerContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  handleEmailChange (event) {
    if (event.target.validity.valid) {
      this.state.email = event.target.value
    }
  }

  handleNameChange (event) {
    if (event.target.value.length > 3) {
    }
  }

  handleUsernameChange (event) {
    if (event.target.value.length > 3) {
      this.state.username = event.target.value
    }
  }

  handlePasswordChange (event) {
    if (event.target.value.length > 3) {
      this.state.password = event.target.value
    }
  }

  handleSubmit () {
  // fetch('/api/users', {method: 'post', body:JSON.stringify(this.state)}).then(console.log)

    fetch('/api/users', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(this.state)}).then(console.log)
  }

  render () {
    return (
      <div id="registrationDiv">
        <h1>Registrer</h1>
        <div className="registrationForm">
          <label htmlFor="name" className="registrationLabel">Full name:</label>
          <input type="text" id="name" className="registrationInput" placeholder="Name" onChange={this.handleNameChange} />
        </div>
        <div className="registrationForm">
          <label htmlFor="username" className="registrationLabel">Username:</label>
          <input type="text" id="username" className="registrationInput" placeholder="Username" onChange={this.handleUsernameChange} />
        </div>
        <div className="registrationForm">
          <label htmlFor="password" className="registrationLabel">Password:</label>
          <input type="password" id="password" className="registrationInput" placeholder="Password" onChange={this.handlePasswordChange} />
        </div>
        <div className="registrationForm">
          <label htmlFor="email" className="registrationLabel">Email:</label>
          <input type="email" id="email" className="registrationInput" placeholder="Email" onChange={this.handleEmailChange} />
        </div>
        <button type="submit" id="loginBtn" onClick={this.handleSubmit}>Registrer</button>
      </div>

      )
  }
}

export default RegistrerContainer
