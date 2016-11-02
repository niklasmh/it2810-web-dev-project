import React, { Component } from 'react';
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
          data: {'Observations': []},
          lat: 63.417993,
          lng: 10.405758,
          zoom: 15,
      }
      this.fetchHandler()
    }



    fetchHandler () {
        var speciesList = '31133,31140,31237,31267,31292'
        var url = 'http://artskart2.artsdatabanken.no/api/observations/list?Taxons='
        var pageSize = 50
        //Fetch is a modern replacement for XMLHttpRequest.
        fetch(`${url + speciesList}&pageSize=${pageSize}`, {
            method: 'GET'
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState(Object.assign({}, this.state, { data: data }))
            })
            .catch((error) => {
                this.setState(Object.assign({}, this.state, { error: error }))
            })
    }

    render () {
        let observations = this.state.data['Observations'].map((element,i) =>{
            return (<Marker position={[parseFloat(element.Latitude), parseFloat(element.Longitude)]} key={i}  />)
        });

        return (
            <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                />
                {observations}
            </Map>

        )
    }
}


export default KartContainer
