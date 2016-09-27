import 'babel-polyfill';
import React from 'react';

import _ from 'lodash'

import {GoogleMapLoader, GoogleMap, Marker, Polygon} from "react-google-maps";
import { withRouter } from 'react-router';

import styles from './../../stylesheets/map.css';

@withRouter
export default class Map extends React.Component {
  constructor (props) {
    super(props);

    this.mapOptions = {
      minZoom: 15,
      fullscreenControl: false,
      streetViewControl: false,
      scaleControl: true,
      clickableIcons: false,
      mapTypeControl: false,


      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE
      },
      styles: [{
        featureType: "all",
        stylers: [
          { saturation: -80 }
        ]
      }, {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          { hue: "#ff0000" },
          { saturation: 50 }
        ]
      }, {
        featureType: "poi.business",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }]
    }

    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsService = new google.maps.DirectionsService;
  }

  componentDidMount () {
    console.log(this.mapContainer)
  }

  componentWillUpdate () {
    this.directionsDisplay.setMap(this.mapContainer.props.map);
    // this.directionsDisplay.setDirections(this.props.directions);
  }

 

  componentWillReceiveProps () {
    // this.directionsDisplay.setDirections(this.props.directions);
  }

  static defaultProps = {
    markers: [],
    defaultCenter: {lat: 48.857511, lng: 2.373364},
    directions: []
  }

  /**
   * Action when a marker is selected
   * @param  {Int} index  Index of Marker selected
   * @param  {Object} marker selected marker's datas
   * @return {null}
   */
  selectMarker(index, marker) {
    this.props.router.push(`/map/${marker.props.slug}`);

    const self = this;

    this.directionsService.route({
      origin: {lat: 48.857927, lng: 2.373118}, // Digitas
      destination: marker.position, // Restaurant position
      travelMode: google.maps.TravelMode.WALKING
    }, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        self.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  render() {
    return (
      <GoogleMapLoader
        containerElement={
          <div
            style={{
              flex: 1,
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            defaultZoom={16}
            defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
            defaultCenter={this.props.defaultCenter}
            defaultMapTypeId={google.maps.MapTypeId.ROADMAP}
            defaultOptions={this.mapOptions}
            ref={(c) => this.mapContainer = c}
          >

          <Polygon options={{
            paths: [{lat: 48.858081, lng: 2.372110}, {lat: 48.857274, lng: 2.372843},
            {lat: 48.857711, lng: 2.373974}, {lat: 48.858491, lng: 2.373130}],
            strokeColor: '#FFFFFF',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#FF0000',
            fillOpacity: 0.35
          }} />

          {this.props.markers.map((marker, index) => {
            return (
              <Marker
                {...marker}
                key={index}
                onClick={this.selectMarker.bind(this, index, marker)}
              />
            );
          })}
          </GoogleMap>
        }
      />
    );
  }
}
