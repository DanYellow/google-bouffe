import 'babel-polyfill';
import React from 'react';

import styles from './../../stylesheets/itinerary.css'

export default class ItineraryContainer extends React.Component {
  render() {
    return (
      <div>
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
