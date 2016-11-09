import React, { Component } from 'react'
import ListeContainer from '../liste/ListeContainer'
import MyPage from '../minside/MyPage'
import KartContainer from '../kart/KartContainer'
import ListeSearch from '../liste/ListeSearch'
import ListeFilter from '../liste/ListeFilter'
import './contentcontainer.css'

/**
 * ContentContainer acts as a placeholder for the rest of the components in the application.
 *
 * @class ContentContainer
 * @extends {Component}
 */
class ContentContainer extends Component {
  /**
   * Creates an instance of ContentContainer.
   *
   * @param {any} props
   *
   * @memberOf ContentContainer
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
      counties: [],
      toggleContent: true
    }
    this.fetchHandler()
  }

  toggleEvent (event) {
    this.setState({
      toggleContent: !this.state.toggleContent
    })
  }

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
   * Displays the div where the list-container (or map-container) will appear in the code.
   *
   * @returns JSX element
   *
   * @memberOf ContentContainer
   */
  render () {
    var cont = ''
    this.state.toggleContent ? cont = <ListeContainer /> : <KartContainer />

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

    switch (this.state.sort) {
      case 'name':
        observationsFiltered.sort(function(a, b) {
          var x = a.Name.toLowerCase(), y = b.Name.toLowerCase()
          return x < y ? -1 : x > y ? 1 : 0;
        })
        break;
      default:
    }

    var cont = ''
    this.state.toggleContent ? cont = <ListeContainer data={observationsFiltered} /> : cont = <KartContainer data={observationsFiltered} />

    return (
      <div id="flexy">
        <div id="sidebar">

          <h3>Velg Fremvisning</h3>
          <button onClick={this.toggleEvent.bind(this)}>Kart/Liste</button>

          <h3>Søk etter art</h3>
          <ListeSearch changeHandler={this.changeEvent.bind(this)} />

          <h3>Sorter på Navn</h3>
          <button onClick={this.sortHandlerName.bind(this)}>Navn</button>

          <ListeFilter title='Fylke' data={this.state.counties} filterHandler={this.filterEvent.bind(this)}/>
          </div>
        <div id="contentbox">
          {cont}
        </div>
      </div>
    )
  }
}

export default ContentContainer
