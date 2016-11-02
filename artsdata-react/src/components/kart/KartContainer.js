import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import './KartContainer.css'

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
    constructor () {
      super()
      this.state = {
          lat: 63.417993,
          lng: 10.405758,
          zoom: 15,
      }
    }

    render () {
        const position = [this.state.lat, this.state.lng]
        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                />
                <Marker position={position}>

                </Marker>
            </Map>
        )
    }
}


export default KartContainer
