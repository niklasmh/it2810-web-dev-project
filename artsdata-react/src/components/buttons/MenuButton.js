import React, { Component } from 'react'

import Button from './Button'
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
      <div className="menu-btn">
        <Button type={this.props.type} clickHandler={this.props.clickHandler}>{this.props.children}</Button>
      </div>
    )
  }
}

export default MenuButton
