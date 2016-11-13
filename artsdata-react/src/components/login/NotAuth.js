import React, { Component } from 'react'

class Auth extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedout: localStorage['loggedin'] == 'false'
    }
  }

  render () {
    let content = null
    if (this.state.loggedout)
      content = this.props.children

    return (
      <div className="not-auth-container not-auth">
        {content}
      </div>
    )
  }
}

export default Auth
