import React, { Component } from 'react';
import './ListeSearch.css';

class ListeSearch extends Component {
  render() {
    return(
      <div className="listeSearch">
        <input onChange={ this.props.changeHandler } type="text" placeholder="søk etter art..." />
      </div>
    )
  }
}

export default ListeSearch
