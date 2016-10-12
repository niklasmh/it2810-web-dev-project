import React, { Component } from 'react'

class ListeSearch extends Component {
  render() {
    return(
      <div>
        <input onChange={ this.props.changeHandler } type="text" placeholder="search" />
      </div>
    )
  }
}

export default ListeSearch
