import React, { Component } from 'react'
import './buttons.css'

/**
 * Button used for navigation of dynamic content.
 *
 * @class Button
 * @extends {Component}
 */
class Button extends Component {
  /**
   * Renders the Button component. The rendered button exposes an
   * onClick event that other components can listen and respond to.
   *
   * @returns JSX element
   *
   * @memberOf Button
   */
  render () {
    return (
      <button name={this.props.name} onClick={this.props.onClick} className="buttons">{this.props.children || this.props.value}</button>
    )
  }
}

export default Button
