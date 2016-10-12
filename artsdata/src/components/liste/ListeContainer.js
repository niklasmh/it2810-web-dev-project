import React, { Component } from 'react'
import ListeElement from './ListeElement'
import ListeSearch from './ListeSearch'

class ListeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {'Observations': []}
    }
    this.fetchHandler()
  }

  fetchHandler() {
    fetch('http://artskart2.artsdatabanken.no/api/observations/list?Taxons=31113,77987&pageSize=50', {
      method: 'GET'
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState(Object.assign({}, this.state, { data: data }));
    })
    .catch((error) => {
      this.setState(Object.assign({}, this.state, { error: error }));
    });
  }

  render() {
    var rows = []
    for (var i = 0; i < this.state.data['Observations'].length; i++)
      rows.push(<ListeElement name={ this.state.data['Observations'][i]['Name'] } key={ i } />)
    
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
