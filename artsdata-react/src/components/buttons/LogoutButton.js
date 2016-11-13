import React, { Component } from 'react'
import './buttons.css'

/**
 * Button used for navigation of dynamic content.
 *
 * @class LogoutButton
 * @extends {Component}
 */
class LogoutButton extends Component {

  clickHandler (evt) {
    this.logout()
  }

  logout () {
    localStorage.removeItem('user')
    location.reload()
  }

  /**
   * Renders the LogoutButton component.
   *
   * @returns JSX element
   *
   * @memberOf LogoutButton
   */
  render () {
    return (
      <a href="#" onClick={this.clickHandler.bind(this)} className="buttons">{this.props.children || 'Logg ut'}</a>
    )
  }
}

export default LogoutButton
