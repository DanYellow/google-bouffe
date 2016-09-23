import 'babel-polyfill';
import React from 'react';
import Radium, { className } from 'radium';



import {GoogleMapLoader, GoogleMap, Marker, Polygon} from "react-google-maps";
// import InfoBox from "react-google-maps/lib/addons/InfoBox";

// https://github.com/tomchentw/react-google-maps
// 

import DetailsRestaurant from './DetailsRestaurant'
import DetailsDigitas from './DetailsDigitas'
import Menu from './Menu'

import styles from './../stylesheets/map.css'


export default class Map extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentMarker: {}
    }
  }

  static mapOptions = {
    minZoom: 10,
    fullscreenControl: false,
    streetViewControl: false,
    scaleControl: true,
    mapTypeControl: false,
    styles: [{
      featureType: "all",
      stylers: [
        { saturation: -80 }
      ]
    },{
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        { hue: "#ff0000" },
        { saturation: 50 }
      ]
    },{
      featureType: "poi.business",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }],
    mapTypeId: google.maps.MapTypeId.ROADMAP
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
  }

  /**
   * Allow switch map to list
   * @param {[type]} mode [description]
   */
  setDisplayMode (mode) {
    alert(mode)
  }

  render() {
    var detailsView = <DetailsRestaurant restaurant={this.state.currentMarker} />
    if (this.state.currentMarker.title === 'Digitas') {
      detailsView =  <DetailsDigitas restaurant={this.state.currentMarker} />
    }
    return (
      <section className={styles.map}>
        <div style={{ height: '100%', flex: .65, display: 'flex', flexDirection: 'column' }}>
          <Menu callbackClick={this.setDisplayMode} />
          <GoogleMapLoader
            containerElement={
              <div
                style={{
                  height: "100%",
                  flex: 1,
                }}
              />
            }
            ref="map"
            googleMapElement={
              <GoogleMap
                
                defaultZoom={15}
                defaultCenter={this.props.defaultCenter}
                defaultMapTypeId={google.maps.MapTypeId.ROADMAP}
                defaultOptions={this.mapOptions}
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
