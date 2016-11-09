import React, { Component } from 'react'
import './MyPage.css'

/**
 * UserInfo displays the Userinfo fields.
 *
 * @class UserInfo
 * @extends {Component}
 */
class UserInfo extends Component {


  validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }
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

        <form>
          <p>Ditt Navn</p>
          <input
            type="text"
            className ="inputfelt"
            placeholder="Endre navn"
            required
          />
          <p>Din Email adresse;</p>
          <input
            type="text"
            className ="inputfelt"
            placeholder="Endre e-mail"
            required
          />
          <p>Endre Passord </p>
          <input
            type="text"
            className ="inputfelt"
            placeholder="passord"
            required
          />
          <input
            type="text"
            className ="inputfelt"
            placeholder="passord"
            required
          />
          <br/>
            <button onClick={this.handleSubmit} > Submit It </button>
        </form>
      </div>
    )
  }
}

export default UserInfo
