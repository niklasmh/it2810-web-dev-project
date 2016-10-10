import React, { Component } from 'react'

class ListeElement extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <li> {this.props.name} </li>
      </div>
    );
  }
}

export default ListeElement
