import React, { Component } from 'react'
import './ListeSearch.css'

/**
 * ListeSearch displays a search field.
 *
 * @class ListeSearch
 * @extends {Component}
 */
class ListeSearch extends Component {
  /**
   * Displays a search-input and exposes an onChange event where other
   * components can listen and respond to changed search-input.
   *
   * @returns JSX element
   *
   * @memberOf ListeSearch
   */
  render () {
    return (
      <div className="liste-search">
        <input onChange={this.props.changeHandler} type="text" placeholder="søk etter art..." />
      </div>
    )
  }
}

export default ListeSearch
