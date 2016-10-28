import React from 'react'
import ReactDOM from 'react-dom'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './App'
import styles from './index.css'

import ListeContainer from './components/liste/ListeContainer'
import KartContainer from './components/kart/KartContainer'

ReactDOM.render (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ListeContainer} />
      <Route path="/kart" component={KartContainer} />
    </Route>
  </Router>,
  document.querySelector('#root')
)
