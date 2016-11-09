import React, { Component } from 'react'
import './buttons.css'

/**
 * Button used for navigation of dynamic content.
 *
 * @class LinkButton
 * @extends {Component}
 */
class LinkButton extends Component {
  /**
   * Renders the LinkButton component. The rendered button exposes an
   * onClick event that other components can listen and respond to.
   *
   * @returns JSX element
   *
   * @memberOf LinkButton
   */
  render () {
    return (
      <button className="buttons">{this.props.children}</button>
    )
  }
}

export default LinkButton
