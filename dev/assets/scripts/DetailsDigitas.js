import 'babel-polyfill';
import React from 'react';

import styles from './../stylesheets/details-view.css'

export default class DetailsDigitas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var tags = null;
    if (this.props.restaurant.tags.length) {
      tags = <ul className={styles.tags}>
            {this.props.restaurant.tags.map(function(tag, index) {
              return <li key={ Date.now() + index } className={styles.tag} title={ window.tagsRef[tag].description }>{ window.tagsRef[tag].title || "Meilleur restaurant ever" }</li>;
          }) }
        </ul>
    }

    var description = "";
    if (this.props.restaurant.description) {
      description = `‘‘${this.props.restaurant.description}’’`
    }

    return (
      <section className={styles.container}>
        <header>
          <figure className={styles.figure}><img src={require('../images/simple_logo_digitas.png')} width={105} /></figure>
          <h1 className={styles.title}>{this.props.restaurant.title}</h1>
          <p itemProp="streetAddress" className={styles.address}><span style={{ fontFamily: "'open_sanssemibold', Arial, sans-serif" }}>Adresse : </span>{this.props.restaurant.address}</p>
        </header>
        <blockquote itemProp="description" className={styles.description}>{ description }</blockquote>
        { tags }
      </section>
    );
  }
}