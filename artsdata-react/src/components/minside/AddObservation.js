import React, { Component } from 'react'

import Button from '../buttons/Button'
import './MyPage.css'

/**
 * AddObservation displays the registrate field.
 *
 * @class AddObservation
 * @extends {Component}
 */
class AddObservation extends Component {
  /**
  * Creates an instance of AddObservation
  *
  * @param: {any} props
  */

  constructor (props) {
    super(props)
    this.state = {
      date: '',
      latitude: '',
      longitude: '',
      species: [],
      specie: {
        Id: '',
        Name: '',
        ScientificName: ''
      },
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
      ]
    }
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchHandler()
  }
  /**
  * Fetches observations from the database.
  *
  * @param: none
  *
  */
  fetchHandler () {
    var url = 'http://localhost:3000/api/taxons'
    // Fetch is a modern replacement for XMLHttpRequest.
    fetch(`${url}`, {
      method: 'GET',
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      this.setState(Object.assign({}, this.state, { species: data }))
    })
    .catch((error) => {
      this.setState(Object.assign({}, this.state, { error: error }))
    })


  }

  /**
  * Validates that the input string is a valid date formatted as "mm/dd/yyyy"
  *
  * @param: {Date} dateString
  *
  */
  isValidDate (dateString) {
    let date = new Date(dateString)
    return Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date.getTime())
  }
  /**
  * Sets the state of this.date to the target eventchange
  *
  * @param {event} event
  *
  */
  handleDateChange (event) {
    this.setState({date: event.target.value})
  }
  /**
  * Checks that the date given is in the correct fromat. returns a Date object in the preferred format.
  *
  * @param: {Date} date
  *
  * returns a Date object with the format as dd/mm/yyyy
  */
  dateFormatter (date) {
    let obj = new Date(date)
    return obj.getDate() + '/' + obj.getMonth() + '/' + obj.getFullYear()
  }
  /**
  * Checks if all values in the input fields are correct before creating a data object that will be sent
  * to the database. All values are retrieved from the input fields that corresponds to the different keys in the database.
  *
  * @param: {event} event
  */
  handleSubmit (event) {
    if (!this.isValidDate(dato.value)) {
      alert('Nå har du ikke skrevet datoen på riktig format. Prøv på nytt!')
      return
    }

    var data = {
      TaxonId : this.state.specie.Id,
      Name: this.state.specie.Name,
      ScientificName : this.state.specie.ScientificName,
      Count: antall.value,
      Notes: kommentar.value,
      County: fylke.value,
      Locality: lokalitet.value,
      Longitude: long.value.substring(0,8),
      Latitude: lat.value.substring(0,8),
      CollectedDate: this.dateFormatter(dato.value),
      User: localStorage['user']
    }
    fetch('/api/observations', {method: 'POST', headers: {'Content-Type': 'application/json'},  body: JSON.stringify(data)})
        .then((response) => {
            return response
        })
        .then((data) => {
            if(data.status == 200){
                this.setState(Object.assign({}, this.state, { status: 'Lagt inn i databasen' }))
            }
            if(data.status == 404){
                this.setState(Object.assign({}, this.state, { status: 'Error' }))
            }
        })
        .catch((error) => {
        }).then(() => {
          if (this.state.status === 'Lagt inn i databasen') {
            setTimeout(function () {
              location.reload()
            }, 1500)
          }
        })
  }
  /**
  * When a user clicks on the map, the corresponing longitude and latitude coordinates will appear
  * and the long/lat fields will change their states to the same coordinates
  *
  * @param: {Coordiantes} position
  *
  */
  setPosition (position) {
    alert("Valgte koordinater: " + "\n" + "Latitude: " + position.lat + "\n" + "Longitude: " + position.lng + "\n" + "Lagt inn i skjema")
    this.setState({latitude: position.lat, longitude: position.lng})
  }
  /**
  * calls and adds the evt arguments target value to the setSpecie method
  *
  * @param {Object} evt
  *
  */
  setSpecieHandler (evt) {
    this.setSpecie(evt.target.value)
  }
  /**
  * Sets the scientific name and ID for the argument given when choosing from a list of species.
  *
  * @param: {Object} name
  *
  */
  setSpecie (name) {
    let specieName = name
    let speciesFiltered = this.state.species.filter(s=>specieName===s.PrefferedPopularname)
    let specieScientificName = ''
    let id = ''

    if (speciesFiltered.length && speciesFiltered[0].ValidScientificName)
      specieScientificName = speciesFiltered[0].ValidScientificName
      id = speciesFiltered[0].Id

    this.setState({
      specie: {
        Id : id,
        Name: specieName,
        ScientificName: specieScientificName
      }
    })
  }
  /**
   * Displays a search-input and exposes an onChange event where other
   * components can listen and respond to changed search-input.
   *
   * @returns JSX element
   *
   * @memberOf MyPage
   */
  render () {
    return (
      <div className="add-observation">
        <h4>Ny Observasjon</h4>
        Art:<br />
        <select id="navn" required onChange={this.setSpecieHandler.bind(this)}>
          {
          this.state.species.filter(s=>s.PrefferedPopularname).map((specie, i) =>
            <option key={i} value={specie.PrefferedPopularname}>{specie.PrefferedPopularname}</option>
          )}
        </select>
        <input id='scientificName' value={this.state.specie.ScientificName} readOnly disabled />
        <br />Funndato:<br />
        <input type="date" className="inputfelt" placeholder="yyyy/mm/dd" id="dato" onChange={this.handleDateChange} required/>

        <br />Antall:<br />
        <input type="number" className="inputfelt" placeholder="antall" id="antall" required/>

        <br />Funnsted:<br />
        <select id="fylke" required>
          {
          this.state.counties.map((county, i) =>
            <option key={i} value={county}>{county}</option>
          )}
        </select>

        <br />Stedsnavn:<br />
        <input type="text" className="inputfelt" placeholder="skriv inn funnsted" id="lokalitet" required />

        <br />Kommentar: <br />
        <input type="text" className="inputfelt" placeholder="skriv inn kommentar" id="kommentar" />

        <br />Latitude and Longitude:<br/>
        (Trykk på kart for å velge koordinater)<br/>
        <input type="number" className="inputfelt" placeholder="Latitude" id="lat" value={this.state.latitude} required/>
        <input type="number" className="inputfelt" placeholder="Longitude" id="long" value={this.state.longitude} required />
        <br/>
        <Button onClick={this.props.toggleEventFunc}>Vis kart</Button><br/>

        <br />
        <Button onClick={this.handleSubmit}>Legg til observasjon</Button>
        <p>{this.state.status}</p>
      </div>
    )
  }
}

export default AddObservation
