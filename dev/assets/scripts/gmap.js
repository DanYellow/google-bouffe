import 'babel-polyfill';
import React from 'react';
import Radium from 'radium';

import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

// https://github.com/tomchentw/react-google-maps

@Radium
export default class GMap extends React.Component {
  constructor (props) {
    super(props);
  }

  handleMarkerRightclick(index, event) {
    alert('plk')
  }

  render() {
    return (
      <section style={styles.container}>
        <GoogleMapLoader
          containerElement={
            <div
              style={{
                height: "100%",
                flex: .75,
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              defaultZoom={15}
              defaultCenter={{ lat: 48.853333, lng: 2.369167 }}
              onClick={this.props.onMapClick}
            >
              {this.props.markers.map((marker, index) => {
                return (
                  <Marker
                    {...marker}
                    onLeftclick={this.handleMarkerRightclick.bind(this, index)}
                  />
                );
              })}
            </GoogleMap>
          }
        />
      </section>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '500px'
  }
}