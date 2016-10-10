import React, { Component } from 'react'
import MenuButton from '../buttons/MenuButton'
import "./header.css"

class Header extends Component {
  clickEvent(evt) {
    console.log(evt.target.innerHTML)
  }

  render() {
    return(
      <div className="header">
        <h1>OVERSKRIFT OOT OOT OOT</h1>
        <MenuButton clickHandler={ this.clickEvent } btnText="Knapp 1" />
        <MenuButton clickHandler={ this.clickEvent } btnText="Knapp 2" />
      </div>
    )
  }
}

export default Header
