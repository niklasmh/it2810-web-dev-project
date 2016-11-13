import React, { Component } from 'react'

class ListeFilter extends Component {
  /**
  * Renders the container for filters. This is used on the main page, specifically in the sidebar.
  * The filter creates a list of different filter options that is available. This is taken in as arguments
  * when the ListeFilter component is called.
  *
  * returns: a <div>-tag with a list of possible filters.
  */

  render () {
    let choices = []
    for (var i = 0; i < this.props.data.length; i++) {
      choices.push(
        <option
          value={this.props.data[i]}
          name={this.props.title}
          key={i}
          >
          {this.props.data[i]}
        </option>
      )
    }

    return (
      <div>
        <h3>Filtrer etter {this.props.title}</h3>
        <div>
          <select
            onChange={this.props.filterHandler}
            name={this.props.title}
          >
            <option value="" name={this.props.title}>Vis alle</option>
            {choices}
          </select>
        </div>
      </div>
    )
  }
}

export default ListeFilter
