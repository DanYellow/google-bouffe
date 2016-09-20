import 'babel-polyfill';
import React from 'react';
import Radium from 'radium';

import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
// import InfoBox from "react-google-maps/lib/addons/InfoBox";

// https://github.com/tomchentw/react-google-maps
// 

import DetailsRestaurant from './DetailsRestaurant'

@Radium
export default class GMap extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentRestaurant: {}
    }
  }

  /**
   * Action when a marker is selected
   * @param  {Int} index  Index of Marker selected
   * @param  {Object} marker selected marker's datas
   * @return {null}
   */
  selectMarker(index, marker) {
    this.setState({currentRestaurant: marker});
  }

  render() {
    return (
      <section style={styles.container}>
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
              defaultCenter={{ lat: 48.857511, lng: 2.373364 }}
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
        <DetailsRestaurant restaurant={this.state.currentRestaurant} />
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
    padding: '15px'
  }
}