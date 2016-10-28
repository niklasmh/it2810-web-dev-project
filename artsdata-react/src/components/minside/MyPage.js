import React, { Component } from 'react'
import MyObservations from './MyObservations'
import UserInfo from './UserInfo'

/**
 * My Page will be used to show and register information specific to a user,
 * such as saving locations, filters and remembering your current items
 *
 * @class MyPage
 * @extends {Component}
 */
class MyPage extends Component {
  /**
   * This is where the code for showing things belonging to "my page" will come.
   */
  render () {
    return (
      <div>
        <UserInfo />
        <MyObservations />
        
      </div>
    )
  }


}

export default MyPage
