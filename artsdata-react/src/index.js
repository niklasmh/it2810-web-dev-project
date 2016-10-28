import React from 'react'
import ReactDOM from 'react-dom'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './App'
import styles from './index.css'

import ListeContainer from './components/liste/ListeContainer'
import KartContainer from './components/kart/KartContainer'
import LoginContainer from './components/login/LoginContainer'
import RegistrerContainer from './components/login/RegistrerContainer'
import MyPage from './components/minside/MyPage'

ReactDOM.render (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ListeContainer} />
      <Route path="/kart" component={KartContainer} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/registrer" component={RegistrerContainer} />
      <Route path="/minside" component={MyPage} />
    </Route>
  </Router>,
  document.querySelector('#root')
)
