import React, { Component } from 'react'
import MenuButton from '../buttons/MenuButton'
import './header.css'

/**
 * Header is used to display a nagivation toggle button and a page title.
 *
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
  /**
   * This function only logs some information to the console.
   * It has no other purpose now, but will be used later.
   *
   * @param  {event} evt An event
   */
  clickEvent (evt) {
    console.log(evt.target.innerHTML)
  }

  /**
   * Displays a page title and a toggle button. The button exposes an onClick event
   * where other components can listen and respond to button clicks.
   *
   * @returns JSX element
   *
   * @memberOf Header
   */
  render () {
    return (
      <div className="header">
        <h1>Sjeldne arter!</h1>
        <MenuButton clickHandler={this.props.toggleListMap} btnText="Liste/Kart" />
        <MenuButton clickHandler={this.props.toggleLogin} btnText="Login" />
      </div>
    )
  }
}

export default Header
