import React, { Component } from 'react'
import MenuButton from '../buttons/MenuButton'
import './header.css'

class Header extends Component {
  /**
   * Creates an instance of Header
   * Header contains a div-element with the title of the page and a toggle-button.
   * When the button is pressed, it calls the toogleEvent-function in ContentContainer.
   *
   * @param {any} evt
   * 
   * @memberOf Header
   */
  clickEvent (evt) {
    console.log(evt.target.innerHTML)
  }

  /**
   * 
   * 
   * @returns
   * 
   * @memberOf Header
   */
  render () {
    return (
      <div className="header">
        <h1>Sjeldne arter!</h1>
        <MenuButton clickHandler={this.props.toggleHandler} btnText="Liste/Kart" />
      </div>
    )
  }
}

export default Header
