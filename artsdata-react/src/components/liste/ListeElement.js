import React, { Component } from 'react'
import './ListeElements.css'

/**
 * ListeElement displays information about a JSON observation object.
 *
 * @class ListeElement
 * @extends {Component}
 */
class ListeElement extends Component {
  /**
   * Receives information about one observation from ListeContainer and displays the observation.
   * The observation is displayed as a rectangular box with a title (name of the observed animal).
   * If the box is clicked, it will expand and show Scientific Name, Date, Location, Observed by and Description.
   *
   * @returns JSX element
   *
   * @memberOf ListeElement
   */
  render () {
    return (
      <div className="listeElement">
        <input type="checkbox" className="toggle-checkbutton" id={this.props.id} />
        <label htmlFor={this.props.id}>
          <strong>{this.props.data.Name}</strong>
        </label>
        <div className="notes">
          <dl>
            <dt>Vitenskapelig navn</dt>
            <dd>{this.props.data.ScientificName}</dd>
            <br />
            <dt>Dato</dt>
            <dd>{this.props.data.CollectedDate}</dd>
            <dt>Sted</dt>
            <dd>{this.props.data.Municipality}, {this.props.data.County} (<a target="_blank" href={'https://www.google.com/maps/preview/@' + this.props.data.Latitude + ',' + this.props.data.Longitude + ',14z'}>{this.props.data.Latitude}, {this.props.data.Longitude}</a>)</dd>
            <dt>Registrert av</dt>
            <dd>{this.props.data.Collector}&nbsp;</dd>
            <dt>Beskrivelse</dt>
            <dd>{this.props.data.Notes}&nbsp;</dd>
          </dl>
        </div>
      </div>
    )
  }
}

export default ListeElement
