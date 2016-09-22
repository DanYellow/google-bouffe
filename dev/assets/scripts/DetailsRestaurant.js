import 'babel-polyfill';
import React from 'react';
import Radium from 'radium';

import { styles } from './DetailsStyles'

@Radium
class BudgetMeter extends React.Component {
  static defaultProps = {
    budgetScale: 5
  }

  static propTypes = {
    budgetScale: React.PropTypes.number
  }

  constructor(props) {

    super(props);
  }

  render() {
    return (
      <div>
        <h3>Budget</h3>
        <div style={styles.meterContainer}>
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
    borderRadius: "3px"
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



@Radium
export default class DetailsRestaurant extends React.Component {
  constructor(props) {
    super(props);

    if (!this.props.restaurant.tags) {
      this.props.restaurant.tags = [];
    }
  }

  render() {
    if (typeof this.props.restaurant.budgetScale === "undefined") {
      return null;
    }

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
          <h1 style={styles.title}>{this.props.restaurant.title}</h1>
          <p itemProp="streetAddress"><span>Adresse : </span>{this.props.restaurant.address}</p>
        </header>
        <blockquote itemProp="description" style={styles.description}>{ description }</blockquote>
        { tags }
        <BudgetMeter budgetScale={this.props.restaurant.budgetScale} />
      </section>
    );
  }
}
