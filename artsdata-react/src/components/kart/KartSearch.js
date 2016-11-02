import React, { Component } from 'react'

/**
 * KartSearch displays a search field.
 *
 * @class KartSearch
 * @extends {Component}
 */
class KartSearch extends Component {
  /**
   * Displays a search-input and exposes an onChange event where other
   * components can listen and respond to changed search-input.
   *
   * @returns JSX element
   *
   * @memberOf KartSearch
   */
  render () {
    return (
      <div className="kart-search">
        <input onChange={this.props.changeHandler} type="text" placeholder="Søk etter art..." />
      </div>
    )
  }
}

export default KartSearch
