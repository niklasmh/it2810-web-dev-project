import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
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
          data: {'Observations': []},
          lat: 63.417993,
          lng: 10.405758,
          zoom: 15,
          search: '',
          bounds: [[],[]]
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

    searchHandler (evt) {
        let val = evt.target.value
        this.setState(Object.assign({}, this.state, { search: val }))
    }

    findCounties () {
      //Find the different locations
      var counties = []
      this.state.data['Observations'].forEach(
        (item) => {
          if (counties.indexOf(item.County) == -1) {
            counties.push(item.County)
          }
        }
      )
    }

    findBounds(inputList){
        if (inputList.length) {
            let obs = inputList;
            let maxLat = obs[0].Latitude;
            let minLat = obs[0].Latitude;
            let maxLng = obs[0].Longitude;
            let minLng = obs[0].Longitude;
            inputList.forEach(elemnt => {
                maxLat = Math.max(elemnt.Latitude, maxLat);
                minLat = Math.min(elemnt.Latitude, minLat);
                maxLng = Math.max(elemnt.Longitude, maxLng);
                minLng = Math.min(elemnt.Longitude, minLng);
            });
            return [[maxLat, maxLng],[minLat, minLng]]
        }
        if (this.state.data['Observations'].length) {
            return this.findBounds(this.state.data['Observations'])
        }
        return [[null, null],[null, null]]

    }

    render () {
        let observations = this.state.data['Observations']
        .filter(element => {
            let search = this.state.search.toLowerCase()

            if (search.length) {
                let keys = ['Name', 'ScientificName']
                let found = false

                keys.forEach(key => {
                    if (element[key].toLowerCase().indexOf(search) !== -1) {
                        found = true
                    }
                });

                return found
            }

            return true
        });
        this.state.bounds = this.findBounds(observations);
        let observationsTransformed = observations.map((element,i) =>{
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
        });

        //return (<Marker posQtion={[parseFloat(element.Latitude), parseFloat(element.Longitude)]} key={i}/>)

        return (
            <div className="kart-container">
                <KartSearch changeHandler={this.searchHandler.bind(this)} />
                <Map center={[this.state.lat, this.state.lng]} bounds={this.state.bounds}>
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
