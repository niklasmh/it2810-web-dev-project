import React, { Component } from 'react'
import ListeElement from './ListeElement'
import ListeSearch from './ListeSearch'
import ListeFilter from './ListeFilter'
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
      searchFilter: {
        name: '',
        county: [],
        municipality: '',
        locality: ''
      },
      sort: '',
      counties: []
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
    var newSearchFilter = this.state.searchFilter
    newSearchFilter.name = event.target.value
    this.setState({
      searchFilter: newSearchFilter
    })
  }

  sortHandlerName (event) {
    this.setState({
      sort: 'name'
    })
  }

  filterEvent (event) {
    var newSearchFilter = this.state.searchFilter

    switch (event.target.name) {
      case 'Fylke':
        if (event.target.checked) {
          newSearchFilter.county.push(event.target.value)
          this.setState({
            searchFilter: newSearchFilter
          })
        } else {
          newSearchFilter.county.splice(newSearchFilter.county.indexOf(event.target.value), 1)
          this.setState({
            searchFilter: newSearchFilter
          })
        }
        break;
      default:
    }
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
    }).then(() => {this.filterProps()})
  }

  //Find the different locations
  filterProps () {
    this.state.data['Observations'].forEach(
      (item) => {
        if (this.state.counties.indexOf(item.County) == -1) {
          this.state.counties.push(item.County)
        }
      }
    )
    this.forceUpdate()
  }

  /**
   * Displays the filtererd data in an array.
   *
   * @returns JSX element
   *
   * @memberOf ListeContainer
   */
  render () {
    console.log('render');
    var rows = []
    /**
     * Filters the data on our searchfilter.
     *
     * @param {any} item
     * @returns
     */
     let observationsFiltered = this.state.data['Observations']
     if (this.state.searchFilter.name.length > 0) {
       observationsFiltered = observationsFiltered.filter(
         (item) => { return item.Name.indexOf(this.state.searchFilter.name) !== -1
         || item.ScientificName.toLowerCase().indexOf(this.state.searchFilter.name) !== -1 }
       )
     }
     if (this.state.searchFilter.county.length > 0) {
       console.log('filter på county');
       observationsFiltered = observationsFiltered.filter(
         (item) => { return item.County.indexOf(this.state.searchFilter.county) !== -1}
       )
     }

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
    return (
      <div className="listview">
        Sorter på: <button onClick={this.sortHandlerName.bind(this)}>Navn</button>
        <ListeSearch changeHandler={this.changeEvent.bind(this)} />
        <ListeFilter title='Fylke' data={this.state.counties} filterHandler={this.filterEvent.bind(this)}/>
        <div>
          {rows}
        </div>
      </div>
    )
  }
}

export default ListeContainer
