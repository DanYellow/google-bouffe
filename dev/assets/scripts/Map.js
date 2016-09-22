import 'babel-polyfill';
import React from 'react';
import Radium, { Style } from 'radium';



import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
// import InfoBox from "react-google-maps/lib/addons/InfoBox";

// https://github.com/tomchentw/react-google-maps
// 

import DetailsRestaurant from './DetailsRestaurant'
import DetailsDigitas from './DetailsDigitas'

@Radium
export default class Map extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentMarker: {}
    }

    this.mapStyle = [
      {
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
      }
    ];

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

  render() {
    var detailsView = <DetailsRestaurant restaurant={this.state.currentMarker} />
    if (this.state.currentMarker.title === 'Digitas') {
      detailsView =  <DetailsDigitas restaurant={this.state.currentMarker} />
    }
    return (
      <section style={styles.container}>
        <Style rules={{
          html: {
            color: '#f4f4f4'
          },
          body: {
            padding: '38px 42px',
            color: '#333333',
            maxWidth: '1300px',
            margin: '0 auto'
          },
          h1: {
            fontSize: '48px'
          },
          header: {
            marginBottom: '15px'
          }
        }} />

        <GoogleMapLoader
          containerElement={
            <div
              style={{
                height: "100%",
                flex: .65,
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              defaultZoom={15}
              defaultCenter={this.props.defaultCenter}
              defaultMapTypeId={google.maps.MapTypeId.ROADMAP}
              defaultOptions={{
                        minZoom: 3,
                          fullscreenControl: false,
                          streetViewControl: false,
                          scaleControl: true,
                          mapTypeControl: false,
                          styles: this.mapStyle
                        }}
            >
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
        {detailsView}
       
      </section>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '500px',
    padding: '15px',
    maxWidth: '1300px',
    margin: '0 auto',
    padding: '10px 0',
    borderTop: '2px solid #da032c',
    borderBottom: '2px solid #da032c',
  }
}