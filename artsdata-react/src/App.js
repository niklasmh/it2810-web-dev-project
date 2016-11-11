import React, { Component } from 'react'

import Header from './components/header/Header'
import './App.css'

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
      <div className="app">
        <Header />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App
