import React, { Component } from 'react'
import ListeContainer from '../liste/ListeContainer'
import KartContainer from '../kart/KartContainer'
import ListeSearch from '../liste/ListeSearch'
import ListeFilter from '../liste/ListeFilter'
import './contentcontainer.css'
import AddObservation from '../minside/AddObservation'

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
        name: [],
        county: [],
        municipality: '',
        locality: ''
      },
      sort: '',
      counties: [
        'Akershus',
        'Aust-Agder',
        'Buskerud',
        'Finnmark',
        'Hedmark',
        'Hordaland',
        'Møre og Romsdal',
        'Nord-Trøndelag',
        'Nordland',
        'Oppland',
        'Oslo',
        'Rogaland',
        'Sogn og Fjordane',
        'Sør-Trøndelag',
        'Telemark',
        'Troms',
        'Vest-Agder',
        'Vestfold',
        'Østfold'
      ],
      names: [
        'villsvin',
        'storflaggermus',
        'slåttehumle',
        'moskusfe',
        'snømus',
        'fiskeørn',
        'gaupe',
        'gulflankedelfin',
        'bredøre',
        'piggsvin'
      ],
      toggleContent: true,
      toggleAddObs: false
    }
    this.fetchHandler()
  }

  toggleEvent (event) {
    this.setState({
      toggleContent: !this.state.toggleContent
    })
  }

  toggleAddObsEvent (event) {
    this.setState({
      toggleAddObs: !this.state.toggleAddObs
    })
  }

  changeEvent (event) {
    var newSearchFilter = this.state.searchFilter
    newSearchFilter.name = event.target.value
    this.setState({
      searchFilter: newSearchFilter
    }, this.fetchHandler())
  }

  sortHandlerName (event) {
    switch (this.state.sort) {
      case 'name':
        this.setState({sort: 'invName'})
        break
      case 'invName':
        this.setState({sort: 'name'})
        break
      default:
        this.setState({sort: 'name'})
        break
    }
  }
  /**
  * Filters observations in the list based on the current filter options
  *
  * @param: {event} event
  *
  * sets the searchFilter based on the event-argument
  */
  filterEvent (event) {
    var newSearchFilter = this.state.searchFilter
    switch (event.target.name) {
      case 'Art':
        newSearchFilter.name = []
        newSearchFilter.name.push(event.target.value)
        this.setState({
          searchFilter: newSearchFilter
        })
        break
      case 'Fylke':
        newSearchFilter.county = []
        newSearchFilter.county.push(event.target.value)
        this.setState({
          searchFilter: newSearchFilter
        })
        break
      default:
    }
  }
  /**
  * retrieves data from the database based on searchFilter.name
  *
  * @param: none
  */
  fetchHandler () {
    var url = 'http://localhost:3000/api/observations'
    // TODO: Legg inn filtersøk/sortering dersom vi skal håndtere det i databasen.
    var search = this.state.searchFilter.name
    var pageIndex = 1
    var pageSize = 50
    var request = `${url}?search=${search}&pageSize=${pageSize}&pageIndex=${pageIndex}`
    // Fetch is a modern replacement for XMLHttpRequest.
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
    })

  }
  /**
  * fetches more results from the database based on the searchFilter. this one is used
  * to fetch more observations from the database if the user wants more observations
  *
  * @param: none
  */
  fetchMoreHandler () {
    var url = 'http://localhost:3000/api/observations'
    // TODO: Legg inn filtersøk/sortering dersom vi skal håndtere det i databasen.
    var search = this.state.searchFilter.name
    var pageIndex = Math.floor(this.state.observations.length / 50) + 1
    var pageSize = 50
    var request = `${url}?search=${search}&pageSize=${pageSize}&pageIndex=${pageIndex}`
    // Fetch is a modern replacement for XMLHttpRequest.
    fetch(request, {
      method: 'GET'
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      var newObservations = this.state.observations.concat(data)
      this.setState(Object.assign({}, this.state, { observations: newObservations }))
    })
    .catch((error) => {
      this.setState(Object.assign({}, this.state, { error: error }))
    })
  }
  sendPosition(position){
    this.refs.addobs.setPosition(position)
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
      console.log('filtrer på name')
      // console.log(this.state.searchFilter.name.length)
      observationsFiltered = observationsFiltered.filter(
        (item) => {
          return item.Name.indexOf(this.state.searchFilter.name) !== -1
        }
      )
    }

    if (this.state.searchFilter.county.length > 0) {
      console.log('filtrer på county')
      // console.log(this.state.searchFilter.name.length)
      observationsFiltered = observationsFiltered.filter(
        (item) => {
          return item.County.indexOf(this.state.searchFilter.county) !== -1
        }
      )
    }
    /* Decides if the user wants to sort the list of observations in any way.
    * this.state.sort decides if the list should be sorted based on its value.
    *
    * @param: this.state.sort
    *
    * returns: a returned sorted list based on the argument given.
    */
    switch (this.state.sort) {
      case 'name':
        observationsFiltered.sort(function (a, b) {
          var x = a.Name.toLowerCase(), y = b.Name.toLowerCase()
          return x < y ? -1 : x > y ? 1 : 0
        })
        break;
      case 'invName':
        observationsFiltered.sort(function (a, b) {
          var y = a.Name.toLowerCase(), x = b.Name.toLowerCase()
          return x < y ? -1 : x > y ? 1 : 0
        })
        break
      default:
    }

    var cont = ''
    this.state.toggleContent ? cont = <ListeContainer data={observationsFiltered} /> : cont = <KartContainer data={observationsFiltered} registerPositionFunc={this.sendPosition.bind(this)} />

    var addobs = ''
    this.state.toggleAddObs ? addobs = <AddObservation ref='addobs' toggleEventFunc={this.toggleEvent.bind(this)}/> : addobs = ''


    return (
      <div id="flexy">
        <div id="sidebar">

          <h3>Velg Fremvisning</h3>
          <button onClick={this.toggleEvent.bind(this)}>Kart/Liste</button>

          <h3>Søk i databasen</h3>
          <ListeSearch changeHandler={this.changeEvent.bind(this)} />

          <h3>Sorter på Navn</h3>
          <button onClick={this.sortHandlerName.bind(this)}>Navn</button>

          <ListeFilter title='Fylke' data={this.state.counties} filterHandler={this.filterEvent.bind(this)} />
          <ListeFilter title='Art' data={this.state.names} filterHandler={this.filterEvent.bind(this)} />

        </div>
        <div id="contentbox">
          <button onClick={this.toggleAddObsEvent.bind(this)} id="sexybutton"><strong>Legg til Observasjon</strong></button>
          <button id="sexybutton"><strong>Vis mine observasjoner</strong></button>
          {addobs}
          {cont}
          <button onClick={this.fetchMoreHandler.bind(this)}>LoadMore</button>
        </div>
      </div>
    )
  }
}

export default ContentContainer
