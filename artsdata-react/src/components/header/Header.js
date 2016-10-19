import React, { Component } from 'react'
import MenuButton from '../buttons/MenuButton'
import './header.css'

class Header extends Component {
  clickEvent (evt) {
    console.log(evt.target.innerHTML)
  }

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
