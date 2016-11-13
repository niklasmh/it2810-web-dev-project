import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import './KartContainer.css'
import KartSearch from './KartSearch'

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
      search: '',
      bounds: [[], []]
    }
  }

  findBounds (inputList) {
    if (inputList.length) {
      let obs = inputList
      let maxLat = obs[0].Latitude
      let minLat = obs[0].Latitude
      let maxLng = obs[0].Longitude
      let minLng = obs[0].Longitude
      inputList.forEach(elemnt => {
        maxLat = Math.max(elemnt.Latitude, maxLat)
        minLat = Math.min(elemnt.Latitude, minLat)
        maxLng = Math.max(elemnt.Longitude, maxLng)
        minLng = Math.min(elemnt.Longitude, minLng)
      })
      return [[maxLat, maxLng], [minLat, minLng]]
    }
    if (this.props.data.length) {
      return this.findBounds(this.props.data)
    }
    return [[71.695960, 32.149458], [57.452945, 2.837935]]
  }

  handleMapClick (event) {
    this.props.registerPositionFunc(event.latlng)
    //alert("Koordinater: " + event.latlng )
  }
  /** renders the map where the KartContainer.js component is called and populates it with observations.
  *
  * @param: none
  *
  */
  render () {
    console.log('kartrender')
    let observations = this.props.data

    this.state.bounds = this.findBounds(observations)
    let observationsTransformed = observations.map((element, i) => {
      let NewMarker = (
        <Marker position={[parseFloat(element.Latitude), parseFloat(element.Longitude)]} key={i}>
          <Popup maxWidth={350}>
            <dl>
              <dt>Navn</dt>
              <dd>{element.Name}</dd>
              <dt>Vitenskapelig navn</dt>
              <dd>{element.ScientificName}</dd>
              <br />
              <dt>Dato</dt>
              <dd>{element.CollectedDate}</dd>
              <dt>Sted</dt>
              <dd>{element.Municipality}, {element.County}, ({element.Latitude}, {element.Longitude})</dd>
              <dt>Registrert av</dt>
              <dd>{element.Collector}&nbsp;</dd>

            </dl>
          </Popup>
        </Marker>
          )
      return (NewMarker)
    })

      // return (<Marker posQtion={[parseFloat(element.Latitude), parseFloat(element.Longitude)]} key={i}/>)

    return (
      <div className="kart-container">
        <Map
          center={[this.state.lat, this.state.lng]}
          bounds={this.state.bounds}
          onClick={this.handleMapClick.bind(this)}
        >
          <TileLayer
            attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
          />
                {observationsTransformed}
        </Map>
      </div>
    )
  }
}

export default KartContainer
