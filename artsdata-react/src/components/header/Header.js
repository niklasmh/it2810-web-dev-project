import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'

import MenuButton from '../buttons/MenuButton'
import './Header.css'
import LinkButton from '../buttons/LinkButton'
import Auth from '../login/Auth'
import NotAuth from '../login/NotAuth'
import LogoutButton from '../buttons/LogoutButton'
import LoginButton from '../buttons/LoginButton'

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
        <h1 className="title">Sjeldne arter i Norge</h1>
        <div className="menu-btns">
          <IndexLink to="/" activeClassName="active"><LinkButton>Artsobservasjoner</LinkButton></IndexLink>
          <Auth><LogoutButton /></Auth>
          <NotAuth><LoginButton /></NotAuth>
        </div>
      </div>
    )
  }
}

export default Header
