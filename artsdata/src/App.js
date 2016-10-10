import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ContentContainer from './components/content/ContentContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
      
        <ContentContainer />
      </div>
    );
  }
}

export default App;
