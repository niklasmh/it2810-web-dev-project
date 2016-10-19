import React, { Component } from 'react'
import './buttons.css'

/**
 * Button used for navigation dynamic content
 *
 * @class MenuButton
 * @extends {Component}
 */
class MenuButton extends Component {
  /**
   * Render the MenuButton component
   *
   * This rendered element emits an event to the Header component on click.
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
