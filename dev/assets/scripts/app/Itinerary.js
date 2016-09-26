import 'babel-polyfill';
import React from 'react';

import _ from 'lodash'

import styles from './../../stylesheets/itinerary.css'



export default class ItineraryContainer extends React.Component {
  render() {
    return (
      <div className={styles['itinerary-container']}>
        <Itinerary datas={this.props.datas} />
      </div>
    );
  }
}

class Itinerary extends React.Component {
  render() {
    return (
      <ol className={styles.itinerary}> {this.props.datas.map(this.renderStep)} </ol>
    );
  }

  renderStep(instruction, index) {
    return ( 
      <li key={ Date.now() + index }>
        <p dangerouslySetInnerHTML={{__html: instruction.instructions}} />
        <span className={styles.details}>Distance : {instruction.distance.text} | Temps : {instruction.duration.text}</span>
      </li> 
    )
  }
}

export class ItinerarySummary extends React.Component {
  render() {
    return (
      <div className={styles['itinerary-summary-container']}>
        <p>Distance totale : {(_.sum(_.map(this.props.datas, 'distance.value')) / 1000).toFixed(2)} km</p>
        <p>Durée total totale : {(_.sum(_.map(this.props.datas, 'duration.value')) / 60).toFixed(2)} minute(s) </p>
      </div>
    );
  }
}

// Tseho: Dans un reducer les deux params, ils représentent bien la valeur par défaut de ton state et l'action lancée, c'est ça ?