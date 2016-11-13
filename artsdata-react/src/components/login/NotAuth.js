import React, { Component } from 'react'

class Auth extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedin: !!(localStorage['user'] && localStorage['user'].length)
    }
  }

  render () {
    let content = null
    if (!(localStorage['user'] && localStorage['user'].length))
      content = this.props.children

    return (
      <div className="not-auth-container not-auth">
        {content}
      </div>
    )
  }
}

export default Auth
