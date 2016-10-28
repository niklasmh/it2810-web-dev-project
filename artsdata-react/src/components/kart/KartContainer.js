import React, { Component } from 'react'
/**
 * KartContainer will be used to show and register information in a map.
 *
 * @class KartContainer
 * @extends {Component}
 */
class KartContainer extends Component {
  /**
   * This is where the code for showing the map and it's functions.
   * The map will have several functions. Amongst them is the possibility to see
   * the locations of the observations in the database. The list container will
   * also link directly to the map when a user clicks the coordinates of an observation.
   *
   * @returns JSX element
   *
   * @memberOf KartContainer
   */
  render () {
    return (
      <div id="mapDiv">

      </div>
    )
  }
}

export default KartContainer
