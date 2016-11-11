import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'
import LinkButton from '../buttons/LinkButton'
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

        <h1>Sjeldne arter i Norge</h1>
        <IndexLink to="/" activeClassName="active"><LinkButton>MainContent</LinkButton></IndexLink>
        <Link to="/login" activeClassName="active"><LinkButton>Login</LinkButton></Link>
        <Link to="/minside" activeClassName="active"><LinkButton>Min SIde</LinkButton></Link>
      </div>
    )
  }
}

export default Header
