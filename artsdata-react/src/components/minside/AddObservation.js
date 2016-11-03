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
    this.state = {date:''};
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        alert('yo biatch');
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
    return (
      <div className="add-observation">
        <h3>Ny Observasjon </h3>

          <input
            type="text"
            className ="inputfelt"
            placeholder="skriv inn artsnavn"
            required
          />
          <input
            type="date"
            className ="inputfelt"
            placeholder="skriv inn dato"
            onChange={this.handleDateChange}
            required
          />
          <input
            type="text"
            className ="inputfelt"
            placeholder="skriv inn funnsted"
            required
          />
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
