import 'babel-polyfill';
import React from 'react';

import {GoogleMapLoader, GoogleMap, Marker, Polygon} from "react-google-maps";

import DetailsRestaurant from './DetailsRestaurant'
import DetailsDigitas from './DetailsDigitas'
import Menu from './Menu'
import ListRestaurants from './ListRestaurants'

import styles from './../stylesheets/map.css'


export default class Map extends React.Component {
  constructor (props) {
    super(props);

    const digitasMarker = this.props.markers.find(function(marker) { return marker.title === 'Digitas'});
    const currentMarker = Object.assign(digitasMarker.props, { title: digitasMarker.title });

    this.state = {
      currentMarker: currentMarker,
      displayMode: 'map'
    }

    this.mapOptions = {
      minZoom: 13,
      fullscreenControl: false,
      streetViewControl: false,
      scaleControl: true,
      clickableIcons: false,
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
  }


  /**
   * Action when a marker is selected
   * @param  {Int} index  Index of Marker selected
   * @param  {Object} marker selected marker's datas
   * @return {null}
   */
  selectMarker(index, marker) {
    const currentMarker = Object.assign(marker.props, { title: marker.title });
    if (!currentMarker.tags) {
      currentMarker.tags = [];
    }
    this.setState({ currentMarker: currentMarker });

    if (this.state.displayMode === "list") {
      this.refs.map.state.map.setCenter(new google.maps.LatLng(marker.position.lat, marker.position.lng));
    }
  }

  /**
   * Allow switch map to list
   * @param {[type]} mode [description]
   */
  setDisplayMode (mode) {
    this.setState({ displayMode: mode });
  }

  render() {
    var detailsView = <DetailsRestaurant restaurant={this.state.currentMarker} />
    if (this.state.currentMarker.title === 'Digitas') {
      detailsView =  <DetailsDigitas restaurant={this.state.currentMarker} />
    }

    const extraClass = this.state.displayMode == 'map' ? null : 'hide';

    return (
      <section className={styles.map}>
        <div style={{ height: '100%', flex: .65, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <Menu callbackClick={this.setDisplayMode.bind(this)} displayMode={this.state.displayMode} />

          <ListRestaurants currentRestaurant={this.state.currentMarker} restaurants={this.props.markers} selectedRestaurantCallback={this.selectMarker.bind(this)} displayMode={this.state.displayMode} />

          <GoogleMapLoader
            containerElement={
              <div style={{ flex: 1, }}  />
            }
            ref="map"
            googleMapElement={
              <GoogleMap  
                defaultZoom={15}
                defaultCenter={this.props.defaultCenter}
                defaultMapTypeId={google.maps.MapTypeId.ROADMAP}
                defaultOptions={this.mapOptions}

                ref={(ref) => this.map = ref}
              >
                <Polygon options={{
                    paths: [
                    {lat: 48.858081, lng: 2.372110},
                    {lat: 48.857274, lng: 2.372843},
                    {lat: 48.857711, lng: 2.373974},
                    {lat: 48.858491, lng: 2.373130}
                  ],
                    strokeColor: '#FFFFFF',
                    strokeOpacity: 0.8,
                    strokeWeight: 1,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35
                  }}  />
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
        </div>
        {detailsView}
       
      </section>
    );
  }
}
