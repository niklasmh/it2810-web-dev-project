import React, { Component } from 'react'
import AddObservation from './AddObservation'
import './MyPage.css'

/**
 * MyObservations displays the registrate field.
 *
 * @class MyObservations
 * @extends {Component}
 */
class MyObservations extends Component {
  /**
   * Displays a search-input and exposes an onChange event where other
   * components can listen and respond to changed search-input.
   *
   * @returns JSX element
   *
   * @memberOf MyPage
   */
  render () {
    return (
      <div className="my-observations">
        <h3>Observasjoner </h3>
        <input type="checkbox" className="toggle-checkbutton" id="skjul" />
        <label htmlFor="skjul">
          <strong>Legg til Observasjon</strong>
          <AddObservation id="skjulmeg" />
          </label>


        <p>Her kommer etterhvert alle observasjonenene som er lagt inn </p>

      </div>
    )
  }
}

export default MyObservations
