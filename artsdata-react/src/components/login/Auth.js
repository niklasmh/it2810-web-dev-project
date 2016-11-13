import React, { Component } from 'react'

class Auth extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedin: localStorage['loggedin'] == 'true'
    }
  }

  render () {
    let content = null
    if (this.state.loggedin)
      content = this.props.children

    return (
      <div className="auth-container auth">
        {content}
      </div>
    )
  }
}

export default Auth
