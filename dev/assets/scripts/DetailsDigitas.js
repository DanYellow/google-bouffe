import 'babel-polyfill';
import React from 'react';
import Radium from 'radium';

import { styles } from './DetailsStyles'

@Radium
export default class DetailsDigitas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(window.tagsRef)
    var tags = null;
    if (this.props.restaurant.tags.length) {
      tags = <ul style={styles.tags}>
            {this.props.restaurant.tags.map(function(tag, index) {
              return <li key={ Date.now() + index } style={styles.tag} title={ window.tagsRef[tag].description }>{ window.tagsRef[tag].title || "Meilleur restaurant ever" }</li>;
          }) }
        </ul>
    }

    var description = "";
    if (this.props.restaurant.description) {
      description = `‘‘${this.props.restaurant.description}’’`
    }

    return (
      <section style={styles.container}>
        <header>
          <figure style={styles.figure}><img src={require('../images/simple_logo_digitas.png')} width={105} /></figure>
          <h1 style={styles.title}>{this.props.restaurant.title}</h1>
          <p itemProp="streetAddress"><span>Adresse : </span>{this.props.restaurant.address}</p>
        </header>
        <blockquote itemProp="description" style={styles.description}>{ description }</blockquote>
        { tags }
      </section>
    );
  }
}