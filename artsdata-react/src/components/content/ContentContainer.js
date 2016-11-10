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
      observations: [],
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
    var url = 'http://localhost:3000/api/observations'
    //TODO: Legg inn filtersøk/sortering dersom vi skal håndtere det i databasen.
    var search = ''
    var pageIndex = 1
    var pageSize = 25
    var request = `${url}?search=${search}&pageSize=${pageSize}&pageIndex=${pageIndex}`
    //Fetch is a modern replacement for XMLHttpRequest.
    fetch(request, {
      method: 'GET'
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      this.setState(Object.assign({}, this.state, { observations: data }))
    })
    .catch((error) => {
      this.setState(Object.assign({}, this.state, { error: error }))
    }).then(() => {this.filterProps()})
  }

  filterProps () {
    this.state.observations.forEach(
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

    let observationsFiltered = this.state.observations
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
