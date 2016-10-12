import React, { Component } from 'react'
import ListeElement from './ListeElement'
import ListeSearch from './ListeSearch'

/**
 * 
 * 
 * @class ListeContainer
 * @extends {Component}
 */
class ListeContainer extends Component {
  /**
   * Creates an instance of ListeContainer.
   * 
   * @param {any} props
   * 
   * @memberOf ListeContainer
   */
  constructor(props) {
    super(props)
    this.state = {
      data: {'Observations': []},
      searchFilter: ''
    }
    this.fetchHandler()
  }

  /**
   * 
   * 
   * @param {any} event
   * 
   * @memberOf ListeContainer
   */
  changeEvent(event) {
    this.setState({
      searchFilter: event.target.value
    })
  }

  /**
   * 
   * 
   * 
   * @memberOf ListeContainer
   */
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

  /**
   * 
   * 
   * @returns
   * 
   * @memberOf ListeContainer
   */
  render() {
    var rows = []
    /**
     * 
     * 
     * @param {any} item
     * @returns
     */
    let observationsFiltered = this.state.data['Observations'].filter(
      (item) => { return item.Name.indexOf(this.state.searchFilter) !== -1}
    )
    for (var i = 0; i < observationsFiltered.length; i++)
      rows.push(<ListeElement name={ observationsFiltered[i].Name } key={ i } />)

    return(
      <div>
        <ListeSearch changeHandler={ this.changeEvent.bind(this) } />
        <ul>
        {rows}
        </ul>
      </div>
    );
  }
}

export default ListeContainer
