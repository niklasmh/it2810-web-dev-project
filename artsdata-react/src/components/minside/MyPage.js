import React, { Component } from 'react'
import AddObservation from './AddObservation'

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
        <p>Her kommer stuff relatert til min side</p>
        <AddObservation />
      </div>
    )
  }
}

export default MyPage
