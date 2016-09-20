import 'babel-polyfill';
import React from 'react';
import Radium from 'radium';


@Radium
export default class DetailsRestaurant extends React.Component {
  render() {
    return (
      <section style={styles.container}>
        <h1 style={styles.title}>{this.props.restaurant.title}</h1>
        <p style={styles.description}>{this.props.restaurant.description}</p>
      </section>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    flex: .35,
    padding: '0 5px 5px 25px',
  },
  title: {
    fontFamily: "'Heveltica Neue', Arial, sans-serif",
    fontSize: "26px"
  },
  description: {
    fontFamily: "'Heveltica Neue', Arial, sans-serif",
    fontSize: "14px",
    marginTop: "9px"
  }
}