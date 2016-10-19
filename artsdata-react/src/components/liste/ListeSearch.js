import React, { Component } from 'react'
import './ListeSearch.css'

class ListeSearch extends Component {
  /**
   * ListeSearch renders an search-input at the top of the page that sends the search-query to the ListeContainer-component
   * It takes and input and sends it to the ListeContainer-method changeHandler
   * @returns
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
