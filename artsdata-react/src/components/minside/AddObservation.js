import React, { Component } from 'react'
import './MyPage.css'

/**
 * AddObservation displays the registrate field.
 *
 * @class AddObservation
 * @extends {Component}
 */
class AddObservation extends Component {

  constructor(props){
    super(props);
    this.state = {
      date:'',
      data: {'Observations': []},
      counties: []
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchHandler();
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

    // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
  isValidDate(dateString){
      // First check for the pattern
      if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
          return false;

      // Parse the date parts tso integers
      var parts = dateString.split("/");
      var day = parseInt(parts[1], 10);
      var month = parseInt(parts[0], 10);
      var year = parseInt(parts[2], 10);

      // Check the ranges of month and year
      if(year < 1000 || year > 3000 || month == 0 || month > 12)
          return false;

      var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

      // Adjust for leap years
      if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
          monthLength[1] = 29;

      // Check the range of the day
      return day > 0 && day <= monthLength[month - 1];
  }

    handleDateChange(event){
      this.setState({date: event.target.value});
    }

    handleSubmit(event){
      if(!this.isValidDate(this.state.date)){
        alert('Nå har du ikke skrevet datoen på riktig format. Prøv på nytt!');
      }
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
    console.log(this.state.counties.length)
    return (
      <div className="add-observation">
        <h3>Ny Observasjon </h3>

        <br/>Artsnavn:<br/>
          <input
            type="text"
            className ="inputfelt"
            placeholder="skriv inn artsnavn"
            required
          />
          <br/>Funndato:<br/>
          <input
            type="date"
            className ="inputfelt"
            placeholder="dd/mm/yyyy"
            onChange={this.handleDateChange}
            required
          />
          <br/>Funnsted:<br/>
          <select required>
            {
              this.state.counties.map((county) =>

              <option value="{county}">{county}</option>
            )}
          </select>


          <br/>Kommentar: <br/>
          <input
            type="text"
            className ="inputfelt"
            placeholder="skriv inn kommentar"
            required
          />
          <br/>
          <button onClick={this.handleSubmit} > Submit It </button>

      </div>
    )
  }
}

export default AddObservation
