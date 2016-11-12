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
import ContentContainer from './components/content/ContentContainer'

function requireAuth(nextState, replace) {
  //if (!auth.loggedIn()) {
  //  replace({
  //    pathname: '/login',
  //    state: { nextPathname: nextState.location.pathname }
  //  })
  //}
}

ReactDOM.render (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ContentContainer} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/registrer" component={RegistrerContainer} />
      <Route path="/minside" component={MyPage} onEnter={requireAuth} />
    </Route>
  </Router>,
  document.querySelector('#root')
)
