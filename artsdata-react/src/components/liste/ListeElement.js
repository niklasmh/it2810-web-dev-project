import React, { Component } from 'react'
import './ListeElements.css'

class ListeElement extends Component {
  render() {
    return (
      <div className="listeElement">
        <input type="checkbox" className="toggle-checkbutton" id={this.props.id} />
        <label htmlFor={ this.props.id }>
          {this.props.data.Name}
        </label>
        <div className="notes">
          Vitenskapelig navn: {this.props.data.ScientificName}
          <br />
          Notater: {this.props.data.Notes}
          <br />
          Koordinater: {this.props.data.Latitude}, {this.props.data.Longitude}
        </div>
      </div>
    );
  }
}

export default ListeElement
