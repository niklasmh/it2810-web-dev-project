import React, { Component } from 'react'
import './App.css'
import ContentContainer from './components/content/ContentContainer'

class App extends Component {
  /**
   * Displays the application.
   *
   * @returns JSX element
   *
   * @memberOf App
   */
  render () {
    return (
      <div className="App">
        <ContentContainer />
      </div>
    )
  }
}

export default App
