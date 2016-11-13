import React, { Component } from 'react'
import { Link } from 'react-router'

import './buttons.css'

/**
 * Button used for navigation of dynamic content.
 *
 * @class LoginButton
 * @extends {Component}
 */
class LoginButton extends Component {

  /**
   * Renders the LoginButton component.
   *
   * @returns JSX element
   *
   * @memberOf LoginButton
   */
  render () {
    return (
      <Link to="/login">{this.props.children || 'Logg inn'}</Link>
    )
  }
}

export default LoginButton
