import React, { Component } from 'react'
import AddObservation from './AddObservation'
import ListeContainer from '../liste/ListeContainer'
import './MyPage.css'

/**
 * MyObservations displays the registrate field.
 *
 * @class MyObservations
 * @extends {Component}
 */
class MyObservations extends Component {
  /**
   * Creates an instance of MyObservations.
   *
   * @param {any} props
   *
   * @memberOf MyObservations
   */
  constructor (props) {
    super(props)
    this.state = {
      username: 'torjuss',
      observations: [],
      sort: ''
    }
    this.fetchHandler()
  }

  fetchHandler () {
    var url = `http://localhost:3000/api/${this.state.username}/observations`
    var pageIndex = 1
    var pageSize = 25
    var request = `${url}?pageSize=${pageSize}&pageIndex=${pageIndex}`
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
   * Displays a search-input and exposes an onChange event where other
   * components can listen and respond to changed search-input.
   *
   * @returns JSX element
   *
   * @memberOf MyPage
   */
  render () {
    var myObservations = this.state.observations.length > 0 ? <ListeContainer data={this.state.observations} /> : <p>Du har ingen registrerte observasjoner.</p>

    return (
      <div className="my-observations">
        <h3>Observasjoner </h3>
        <input type="checkbox" className="toggle-checkbutton" id="skjul" />
        <label htmlFor="skjul">
          <strong>Legg til Observasjon</strong>
          <AddObservation id="skjulmeg" />
        </label>

        <h4>Mine observasjoner</h4>
        {myObservations}
      </div>
    )
  }
}

export default MyObservations
