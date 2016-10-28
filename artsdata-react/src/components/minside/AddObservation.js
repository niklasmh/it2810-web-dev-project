import React, { Component } from 'react'
import './AddObservation.css'

/**
 * AddObservation displays the registrate field.
 *
 * @class AddObservation
 * @extends {Component}
 */
class AddObservation extends Component {
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
      <div className="add-observation">
        <h3>Ny Observasjon </h3>
        <input type="text" className ="inputfelt" placeholder="skriv inn artsnavn" />
        <input type="text" className ="inputfelt" placeholder="skriv inn funnsted" />
        <input type="text" className ="inputfelt" placeholder="skriv inn kommentar" />
      </div>
    )
  }
}

export default AddObservation
