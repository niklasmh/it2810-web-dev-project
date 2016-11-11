import React, { Component } from 'react'
import './MyPage.css'

/**
 * AddObservation displays the registrate field.
 *
 * @class AddObservation
 * @extends {Component}
 */
class AddObservation extends Component {

  constructor (props) {
    super(props)
    this.state = {
      date: '',
      species: [],
      specie: {
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

  // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
  isValidDate (dateString) {
    let date = new Date(dateString)
    return Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date.getTime())
  }

  handleDateChange (event) {
    this.setState({date: event.target.value})
  }

  dateFormatter (date) {
    let obj = new Date(date)
    return obj.getDate() + '/' + obj.getMonth() + '/' + obj.getFullYear()
  }

  handleSubmit (event) {
    console.log(this.dateFormatter(dato.value), dato.value, this.isValidDate(dato.value))
    if (!this.isValidDate(dato.value)) {
      alert('Nå har du ikke skrevet datoen på riktig format. Prøv på nytt!')
      return
    }

    var data = {
      TaxonId : navn.value.TaxonId,
      Name: navn.value.PrefferedPopularname,
      ScientificName : navn.value.ValidScientificName,
      Count: antall.value,
      Notes: kommentar.value,
      County: fylke.value,
      Municipality: '',
      Locality: lokalitet.value,
      Longitude: '',
      Latitude: '',
      CollectedDate: this.dateFormatter(dato.value),
      User: this.state.username
    }

    fetch('http://localhost/api/observations', {
      body: JSON.stringify(data),
      method: 'POST'
    }).then(r => r.json()).then(console.log)
  }

  setSpecieHandler (evt) {
    this.setSpecie(evt.target.value)
  }

  setSpecie (name) {
    let specieName = name
    let speciesFiltered = this.state.species.filter(s=>specieName===s.PrefferedPopularname)
    let specieScientificName = ''

    if (speciesFiltered.length && speciesFiltered[0].ValidScientificName)
      specieScientificName = speciesFiltered[0].ValidScientificName
    this.setState({
      specie: {
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
            <option
              key={i}
              value={specie.PrefferedPopularname}
            >
              {specie.PrefferedPopularname}</option>
          )}
        </select>
        <input value={this.state.specie.ScientificName} readOnly disabled />

        <br />Funndato:<br />
        <input
          type="date"
          className="inputfelt"
          placeholder="yyyy/mm/dd"
          id="dato"
          onChange={this.handleDateChange}
          required
        />

        <br />Antall:<br />
        <input
          type="number"
          className="inputfelt"
          placeholder="antall"
          id="antall"
          required
        />

        <br />Funnsted:<br />
        <select id="fylke" required>
          {
          this.state.counties.map((county, i) =>
            <option key={i} value={county}>{county}</option>
          )}
        </select>

        <br />Stedsnavn:<br />
        <input
          type="text"
          className="inputfelt"
          placeholder="skriv inn funnsted"
          id="lokalitet"
          required
        />

        <br />Kommentar: <br />
        <input
          type="text"
          className="inputfelt"
          placeholder="skriv inn kommentar"
          id="kommentar"
          required
        />

        <br />
        <button onClick={this.handleSubmit} > Legg til observasjon </button>
      </div>
    )
  }
}

export default AddObservation
