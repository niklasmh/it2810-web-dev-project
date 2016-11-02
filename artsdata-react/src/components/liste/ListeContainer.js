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
      searchFilter: {name: ''},
      sort: ''
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
      searchFilter: {name: event.target.value}
    })
  }

  sortHandlerName (event) {
    this.setState({
      sort: 'name'
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
    let date = new Date()
    var rows = []
    /**
     * Filters the data on our searchfilter.
     *
     * @param {any} item
     * @returns
     */
    let observationsFiltered = this.state.data['Observations'].filter(
      (item) => { return item.Name.indexOf(this.state.searchFilter.name) !== -1 }
    )

    //Find the different locations
    var counties = []
    this.state.data['Observations'].forEach(
      (item) => {
        if (counties.indexOf(item.County) == -1) {
          counties.push(item.County)
        }
      }
    )

    //Sort the list by a criteria
    switch (this.state.sort) {
      case 'name':
        observationsFiltered.sort(function(a, b) {
          var x = a.Name.toLowerCase(), y = b.Name.toLowerCase()
          return x < y ? -1 : x > y ? 1 : 0;
        })
        break;
      default:
    }

    for (var i = 0; i < observationsFiltered.length; i++) {
      rows.push(<ListeElement data={observationsFiltered[i]} id={'element-' + i} key={i} />)

    }
    let date2 = new Date()
    console.log('Loading time:');
    console.log(date2 - date);
    return (
      <div className="listview">
        Sorter på: <button onClick={this.sortHandlerName.bind(this)}>Navn</button>
        <ListeSearch changeHandler={this.changeEvent.bind(this)} />
        <div>
          {rows}
        </div>
      </div>
    )
  }
}

export default ListeContainer
