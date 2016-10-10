import React, { Component } from 'react'
import ListeContainer from '../liste/ListeContainer'
import Header from '../header/Header'

class ContentContainer extends Component {
  render() {
    return(
      <div>
        <Header />
        <ListeContainer />
      </div>
    );
  }
}

export default ContentContainer
