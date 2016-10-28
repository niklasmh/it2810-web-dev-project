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
        <input onChange={this.props.changeHandler} type="text" placeholder="skriv inn artsnavn" />
      </div>
    )
  }
}

export default AddObservation
