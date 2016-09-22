import 'babel-polyfill';
import React from 'react';
import Radium, { Style } from 'radium';



import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
// import InfoBox from "react-google-maps/lib/addons/InfoBox";

// https://github.com/tomchentw/react-google-maps
// 

import DetailsRestaurant from './DetailsRestaurant'

@Radium
export default class Map extends React.Component {
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
    const currentRestaurant = Object.assign(marker.props, { title: marker.title });
    if (!currentRestaurant.tags) {
      currentRestaurant.tags = [];
    }
    this.setState({ currentRestaurant: currentRestaurant });
  }

  render() {
    return (
      <section style={styles.container}>
        <Style rules={{
          body: {
            padding: "38px 42px",
            color: '#333333'
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
    padding: '15px',
    maxWidth: '1300px',
    margin: '0 auto',
    padding: '10px 0',
    borderTop: '2px solid #da032c',
    borderBottom: '2px solid #da032c',
  }
}