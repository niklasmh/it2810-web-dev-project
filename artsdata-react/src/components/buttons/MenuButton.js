import React, { Component } from 'react'
import './buttons.css'

/**
 * Button used for navigation of dynamic content.
 *
 * @class MenuButton
 * @extends {Component}
 */
class MenuButton extends Component {
  /**
   * Renders the MenuButton component. The rendered button exposes an
   * onClick event that other components can listen and respond to.
   *
   * @returns JSX element
   *
   * @memberOf MenuButton
   */
  render () {
    return (
      <div>
        <button onClick={this.props.clickHandler} className="buttons">{this.props.btnText}</button>
      </div>
    )
  }
}

export default MenuButton
