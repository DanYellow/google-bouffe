import 'babel-polyfill';
import React from 'react';

import _ from 'lodash'

import {GoogleMapLoader, GoogleMap, Marker, Polygon} from "react-google-maps";
import { withRouter } from 'react-router';

import styles from './../../stylesheets/map.css';

const getRestaurantForSlug = function (slug, restaurant) {
  return restaurant.props.slug === slug;
}


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


  static defaultProps = {
    markers: [],
    defaultCenter: {lat: 48.857511, lng: 2.373364},
    directions: []
  }

  /**
   * Action when a marker is selected
   * @param  {Int} index  Index of Marker selected
   * @param  {Object} marker selected marker's datas
   * @return null
   */
  selectMarker(index, marker) {
    this.props.router.push(`/map/${marker.props.slug}`);
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
            ref={this.props.onMapLoad}
          >
          
          <Polygon options={{
            paths: [{lat: 48.858347, lng: 2.372747}, {lat: 48.858516, lng: 2.373284},
            {lat: 48.857719, lng: 2.373949}, {lat: 48.857468, lng: 2.373364}],
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
