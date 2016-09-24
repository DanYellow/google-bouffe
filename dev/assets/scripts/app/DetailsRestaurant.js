import 'babel-polyfill';
import React from 'react';

import styles from './../../stylesheets/details-view.css'

class BudgetMeter extends React.Component {
  static defaultProps = {
    budgetScale: 5
  }

  // We type our props
  static propTypes = {
    budgetScale: React.PropTypes.number
  }

  render() {
    return (
      <div>
        <h3 style={{ fontFamily: "'open_sansregular', Arial, sans-serif", marginBottom: "3px" }}>Budget</h3>
        <div className={styles.meterContainer}>
          <div style={budgetMeterStyle(this.props.budgetScale)}></div>
        </div>
      </div>
    )
  }
}

var budgetMeterStyle = function(value) {
  value = value * .1;
  return {
    width: "100%",
    transform: `scaleX(${value})`,
    transformOrigin: "left center",
    backgroundColor: meterBGColor(value),
    height: '100%',
    borderRadius: "3px",
    'transition': '.3s all'
  }
}

const meterBGColor = function (value) {
  if (value > .75) {
    return '#ff0000';
  } else if (value < .75 && value > .5) {
    return '#ee0000';
  } else if (value === 0.5) {
    return '#ffb400';
  } else if (value < .5 && value > .25) {
    return '#05cd00';
  } else if (value < .25) {
    return '#129c00';
  } else {
    return 'white';
  }
}


export default class DetailsRestaurant extends React.Component {
  constructor(props) {
    super(props);

    if (!this.props.restaurant.tags) {
      this.props.restaurant.tags = [];
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.restaurant.title !== this.props.restaurant.title;
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
          <h1 className={styles.title}>{this.props.restaurant.title}</h1>
          <p itemProp="streetAddress" className={styles.address}><span style={{ fontFamily: "'open_sanssemibold', Arial, sans-serif" }}>Adresse : </span>{this.props.restaurant.address}</p>
        </header>
        <blockquote itemProp="description" className={styles.description}>{ description }</blockquote>
        { tags }
        <BudgetMeter budgetScale={this.props.restaurant.budgetScale} />
      </section>
    );
  }
}
