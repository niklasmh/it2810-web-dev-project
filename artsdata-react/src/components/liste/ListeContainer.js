import React, { Component } from 'react'
import ListeElement from './ListeElement'
import ListeSearch from './ListeSearch'
import './ListeContainer.css'

/**
 * ListeContainer fetches information from an open API and displays the information in an array of ListeElements components.
 *
 * @class ListeContainer
 * @extends {Component}
 */
class ListeContainer extends Component {
  /**
   * Creates an instance of ListeContainer.
   *
   * @param {any} props
   *
   * @memberOf ListeContainer
   */
  constructor (props) {
    super(props)
    this.state = {
      data: {'Observations': []},
      searchFilter: ''
    }
    this.fetchHandler()
  }

  /**
   * Handles an event emitted from the child component ListeElement.
   *
   * @param {event} event
   *
   * @memberOf ListeContainer
   */
  changeEvent (event) {
    this.setState({
      searchFilter: event.target.value
    })
  }

  /**
   * Fetches the data from Artsdatabanken.
   *
   * @memberOf ListeContainer
   */
  fetchHandler () {
    var speciesList = '31133,31140,31237,31267,31292'
    var url = 'http://artskart2.artsdatabanken.no/api/observations/list?Taxons='
    var pageSize = 50
    //Fetch is a modern replacement for XMLHttpRequest.
    fetch(`${url + speciesList}&pageSize=${pageSize}`, {
      method: 'GET'
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      this.setState(Object.assign({}, this.state, { data: data }))
    })
    .catch((error) => {
      this.setState(Object.assign({}, this.state, { error: error }))
    })
  }

  /**
   * Displays the filtererd data in an array.
   *
   * @returns JSX element
   *
   * @memberOf ListeContainer
   */
  render () {
    var rows = []
    /**
     * Filters the data on our searchfilter.
     *
     * @param {any} item
     * @returns
     */
    let observationsFiltered = this.state.data['Observations'].filter(
      (item) => { return item.Name.indexOf(this.state.searchFilter) !== -1 }
    )

    for (var i = 0; i < observationsFiltered.length; i++) {
      rows.push(<ListeElement data={observationsFiltered[i]} id={'element-' + i} key={i} />)
    }
    return (
      <div className="listview">
        <ListeSearch changeHandler={this.changeEvent.bind(this)} />
        <div>
          {rows}
        </div>
      </div>
    )
  }
}

export default ListeContainer
