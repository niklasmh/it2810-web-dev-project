import React, { Component } from 'react'
import './RegistrerContainer.css'
import { browserHistory } from 'react-router'

class RegistrerContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            status: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)

    }
  handleEmailChange (event) {
    if (event.target.validity.valid) {
        this.state.email = event.target.value,
        this.setState({ status: '' })
    }else{
        this.setState({ status: 'Email is not vaild' })
    }
  }

  handleUsernameChange (event) {
    if (event.target.value.length > 3) {
        this.state.username = event.target.value
        this.setState({ status: '' })
    }else{
        this.setState({ status: 'Username must be more than 3 characters' })
    }
  }

  handlePasswordChange (event) {
    if (event.target.value.length > 3) {
        this.state.password = event.target.value
        this.setState({ status: '' })
    }else{
        this.setState({ status: 'Password must be more than 3 characters' })
    }
  }

    handleSubmit () {
        if(this.state.username < 3) {
            this.setState({status: 'Fields are not vaild'})
        }else{
            fetch ('/api/users', {method: 'POST', headers: {'Content-Type': 'application/json'},body:JSON.stringify(this.state)})
                .then((response) => {
                return response.status
                })
                .then((data) => {
                    console.log(data)
                    if (data == 200) {
                        this.setState(Object.assign({}, this.state, { status: 'Successfully registered, you will now be redirected to the login' }))
                    }
                    if(data == 404){
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
            <div id="registrationDiv">
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
                <button type="submit" id="loginBtn" onClick={this.handleSubmit}>Registrer</button>
                <p id="status">{this.state.status}</p>
            </div>

      )
  }
}

export default RegistrerContainer
