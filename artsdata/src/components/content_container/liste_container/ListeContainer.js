import React, { Component } from 'react'
import ListeElement from './liste_element/ListeElement'
import ListeSearch from './liste_search/ListeSearch'

class ListeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      names: ['Bjørn', 'Ole', 'Nora']
    }
  }

  render() {
    var rows = []
    for (var i = 0; i < 3; i++) {
      rows.push(<ListeElement name={this.state.names[i]} />)
    }
    return(
      <div>
        <ListeSearch />
        <ul>
        {rows}
        </ul>
      </div>
    );
  }
}

export default ListeContainer
