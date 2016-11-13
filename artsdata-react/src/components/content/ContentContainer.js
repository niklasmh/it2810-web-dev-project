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
        searchtext: '',
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
    newSearchFilter.searchtext = event.target.value
    this.setState({
      searchFilter: newSearchFilter
    }, this.fetchHandler())
  }

  sortHandlerName (event) {
    switch (event.target.name) {
      case 'navn':
        (this.state.sort === 'name') ? this.setState({sort: 'invName'}) : this.setState({sort: 'name'})
        break
      case 'dato':
        (this.state.sort === 'date') ? this.setState({sort: 'invDate'}) : this.setState({sort: 'date'})
        break
      default:
    }
  }

  filterEvent (event) {
    var newSearchFilter = this.state.searchFilter
    switch (event.target.name) {
      case 'Fylke':
        newSearchFilter.county = []
        newSearchFilter.county.push(event.target.value)
        this.setState({
          searchFilter: newSearchFilter
        }, this.fetchHandler())
        break
      case 'Art':
        newSearchFilter.name = []
        newSearchFilter.name.push(event.target.value)
        this.setState({
          searchFilter: newSearchFilter
        }, this.fetchHandler())
        break
      default:
    }
  }

  fetchHandler () {
    var url = 'http://localhost:3000/api/observations'
    // TODO: Legg inn filtersøk/sortering dersom vi skal håndtere det i databasen.
    var search = this.state.searchFilter.searchtext
    if (this.state.searchFilter.county[0]) {
      (search !== '') ? search += '|' + this.state.searchFilter.county[0] : search = this.state.searchFilter.county[0]
    }
    if (this.state.searchFilter.name[0]) {
      (search !== '') ? search += '|' + this.state.searchFilter.name[0] : search = this.state.searchFilter.name[0]
    }
    console.log('searching for ' + search)
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
    }).then(() => { this.filterProps() })
  }

  fetchMoreHandler () {
    var url = 'http://localhost:3000/api/observations'
    // TODO: Legg inn filtersøk/sortering dersom vi skal håndtere det i databasen.
    var search = this.state.searchFilter.searchtext
    if (this.state.searchFilter.county[0]) {
      (search !== '') ? search += '|' + this.state.searchFilter.county[0] : search = this.state.searchFilter.county[0]
    }
    if (this.state.searchFilter.name[0]) {
      (search !== '') ? search += '|' + this.state.searchFilter.name[0] : search = this.state.searchFilter.name[0]
    }
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
    }).then(() => { this.filterProps() })
  }

  filterProps () {
    this.state.observations.forEach(
      (item) => {
        if (this.state.counties.indexOf(item.County) === -1) {
          this.state.counties.push(item.County)
        }
        if (this.state.names.indexOf(item.Name) === -1) {
          this.state.names.push(item.Name)
        }
      }
    )
    this.forceUpdate()
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

    if (this.state.searchFilter.county.length > 0) {
      console.log('filtrer på county')
      observationsFiltered = observationsFiltered.filter(
        (item) => {
          return item.County.indexOf(this.state.searchFilter.county) !== -1
        }
      )
    }
    if (this.state.searchFilter.name.length > 0) {
      console.log('filtrer på name')
      observationsFiltered = observationsFiltered.filter(
        (item) => {
          return item.Name.indexOf(this.state.searchFilter.name) !== -1
        }
      )
    }

    switch (this.state.sort) {
      case 'name':
        observationsFiltered.sort(function (a, b) {
          var x = a.Name.toLowerCase(), y = b.Name.toLowerCase()
          return x < y ? -1 : x > y ? 1 : 0
        })
        break
      case 'invName':
        observationsFiltered.sort(function (a, b) {
          var y = a.Name.toLowerCase(), x = b.Name.toLowerCase()
          return x < y ? -1 : x > y ? 1 : 0
        })
        break
      case 'date':
        observationsFiltered.sort(function (a, b) {
          var y = a.CollectedDate.toLowerCase(), x = b.CollectedDate.toLowerCase()
          return x > y ? -1 : x < y ? 1 : 0
        })
        break
      case 'invDate':
        observationsFiltered.sort(function (a, b) {
          var y = a.CollectedDate.toLowerCase(), x = b.CollectedDate.toLowerCase()
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

          <h3>Sortering</h3>
          <button name="navn" onClick={this.sortHandlerName.bind(this)}>Navn</button>
          <button name="dato" onClick={this.sortHandlerName.bind(this)}>Dato</button>

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
