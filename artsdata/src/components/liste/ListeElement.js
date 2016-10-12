import React, { Component } from 'react'
import './ListeElements.css'

class ListeElement extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="listeElement">
        <li> {this.props.name} </li>
      </div>
    );
  }
}

export default ListeElement
