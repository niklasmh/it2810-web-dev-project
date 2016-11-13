import React, { Component } from 'react'
import './RegistrerContainer.css'
import { browserHistory } from 'react-router'
import Button from '../buttons/Button'
/**
* RegisterContainer renders and controls the logic behind registering a new user to the database.
* The Component checks that the user is not allready in the database, and that the user must have
* the correct paramters for registering, i.e: minimum length on a username, password and correct syntax on E-mail
*
* @Class RegisterContainer
* @extends {Component}
*/

class RegistrerContainer extends Component {
  /**
  * Creates an instance of RegisterContainer
  *
  * @param {any} props
  *
  * @memberOf RegisterContainer
  */

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      status: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }
  /**
  * Checks if the E-mail input-field has a valid value (has @ and a valid domain name at the end)
  *
  * @param: {event} event
  *
  * Sets the status-field of RegisterContainer depending on the event objects value.
  */
  handleEmailChange (event) {
    if (event.target.validity.valid) {
      this.state.email = event.target.value,
      this.setState({ status: '' })
    } else {
      this.setState({ status: 'Email is not vaild' })
    }
  }
  /**
  * Checks the username-field for values that corresponds to the minimum requierments.
  * Warns the user if the username has less than 3 characters.
  *
  * @param: {event} event
  *
  */
  handleUsernameChange (event) {
    if (event.target.value.length > 3) {
      this.state.username = event.target.value
      this.setState({ status: '' })
    } else {
      this.setState({ status: 'Username must be more than 3 characters' })
    }
  }
  /**
  * Checks the password-field for values that corresponds to the minimum requierments.
  * Warns the user if the password has less than 3 characters
  *
  * @param {event} event
  *
  */
  handlePasswordChange (event) {
    if (event.target.value.length > 3) {
      this.state.password = event.target.value
      this.setState({ status: '' })
    } else {
      this.setState({ status: 'Password must be more than 3 characters' })
    }
  }
  /**
  * Checks if the fields are valid before running a POST method to the database to confirm if the username is taken or not.
  * If the username is not taken it will be written to the database and the user will be redirected to the login page.
  *
  * @param: none
  */

  handleSubmit () {
    if(this.state.username < 3) {
      this.setState({status: 'Fields are not vaild'})
    } else {
      fetch ('/api/users', {method: 'POST', headers: {'Content-Type': 'application/json'},body:JSON.stringify(this.state)})
      .then((response) => {
        return response.status
      })
      .then((data) => {
        console.log(data)
        if (data == 200) {
          this.setState(Object.assign({}, this.state, { status: 'Successfully registered, you will now be redirected to the login' }))
        }
        if(data == 404) {
          this.setState(Object.assign({}, this.state, { status: 'User already exists' }))
        }
      })
      .catch((error) => {
      }).then(() => {
        if (this.state.status === 'Successfully registered, you will now be redirected to the login') {
          setTimeout(function () {
            browserHistory.push('/login')
          }, 1500)
        }
      })
    }
  }

  render () {
    return (
      <div className="registration-container module">
        <h1>Registrer</h1>
        <div className="registrationForm">
          <label htmlFor="username" className="registrationLabel">Username:</label>
          <input type="text" id="username" className="registrationInput" placeholder="Username" onChange={this.handleUsernameChange}/>
        </div>
        <div className="registrationForm">
          <label htmlFor="password" className="registrationLabel">Password:</label>
          <input type="password" id="password" className="registrationInput" placeholder="Password" onChange={this.handlePasswordChange}/>
        </div>
        <div className="registrationForm">
          <label htmlFor="email" className="registrationLabel">Email:</label>
          <input type="email" id="email" className="registrationInput" placeholder="Email" onChange={this.handleEmailChange}/>
        </div>
        <Button type="submit" id="loginBtn" onClick={this.handleSubmit}>Registrer</Button>
        <p id="status">{this.state.status}</p>
      </div>
    )
  }
}

export default RegistrerContainer
