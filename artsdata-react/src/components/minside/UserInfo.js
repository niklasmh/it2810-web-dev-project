import React, { Component } from 'react'
import './MyPage.css'

/**
 * UserInfo displays the Userinfo fields.
 *
 * @class UserInfo
 * @extends {Component}
 */
class UserInfo extends Component {
  /**
   * Displays all the currently saved information about a specific user.
   *
   * @returns JSX element
   *
   * @memberOf MyPage
   */
  render () {
    return (
      <div className="user-info">
        <h3>Brukerinformasjon </h3>
        <p>Her kan du se og endre din brukerinformasjon.</p>
        <p>Ditt Navn</p>
        <input type="text" className ="inputfelt" placeholder="Endre navn" />
        <p>Din Email adresse;</p>
        <input type="text" className ="inputfelt" placeholder="Endre e-mail" />
        <p>Endre Passord </p>
        <input type="text" className ="inputfelt" placeholder="passord" />
        <input type="text" className ="inputfelt" placeholder="passord" />
      </div>
    )
  }
}

export default UserInfo
