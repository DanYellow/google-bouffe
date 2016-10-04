import 'babel-polyfill';
import React from 'react';

import ItineraryContainer, { ItinerarySummary } from './Itinerary'

import styles from './../../stylesheets/details-view.css'
import button from './../../stylesheets/button.css'

class BudgetMeter extends React.Component {
  static defaultProps = {
    budgetScale: 5
  }

  // We type our props
  static propTypes = {
    budgetScale: React.PropTypes.number
  }

  budgetMeterStyle (value) {
    value = value * .1;
    return {
      width: "100%",
      transform: `scaleX(${value})`,
      transformOrigin: "left center",
      backgroundColor: meterBGColor(value),
      height: '100%',
      borderRadius: '3px',
      'transition': '.3s all'
    }
  }

  render() {
    return (
      <div>
        <h3 style={{ fontFamily: "'open_sansregular', Arial, sans-serif", marginBottom: "3px" }} title="Budget pour une personne">Budget</h3>
        <div className={styles.meterContainer}>
          <div style={this.budgetMeterStyle(this.props.budgetScale)}></div>
        </div>
      </div>
    )
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

    this.state = {
      displayItinary: false,
      isInMySurvey: false
    }
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   return nextProps.restaurant.title !== this.props.restaurant.title;
  // }

  componentWillReceiveProps(nextProps) {
    document.title = `🍽 Google Bouffe - ${nextProps.restaurant.title}`;

    let answers = window.localStorage.getItem('survey_anwsers') || '';
    this.setState({ isInMySurvey: answers.includes(nextProps.restaurant.title) });
  }

  toggleDisplay() {
    this.setState({displayItinary: !this.state.displayItinary});
  }

  togglePresenceInSurvey() {
    let answers = JSON.parse(window.localStorage.getItem('survey_anwsers')) || [];
    let { title, slug } = this.props.restaurant;

    if (this.state.isInMySurvey) {
      answers = answers.filter((restaurant) =>
        restaurant.title !== title
      );
    } else {
      answers.push({
        'title': title,
        'url': `/#/list/${slug}`
      });
    }

    window.localStorage.setItem('survey_anwsers', JSON.stringify(answers));

    this.setState({isInMySurvey: !this.state.isInMySurvey});
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
          <button type="action" 
                  className={[button.reset, button.cta, button.fullwidth].join(' ')} 
                  onClick={() => this.togglePresenceInSurvey()}> 
                    { this.state.isInMySurvey ? "(-) Retirer de mon sondage" : "(+) Ajouter à mon sondage" }
          </button>
        </header>
        <div className={[styles.details, (this.state.displayItinary) ? styles.hide : null].join(' ')}>
          <blockquote itemProp="description" className={styles.description}>{ description }</blockquote>
          { tags }
          <BudgetMeter budgetScale={this.props.restaurant.budgetScale} />

          <button style={{marginTop: 'auto'}} className={[button.reset, button.cta, button.fullwidth].join(' ')} onClick={() => this.toggleDisplay()}>Afficher itinéraire</button>
        </div>

        <div className={[styles.details, styles.itinerary, (!this.state.displayItinary) ? styles.hide : null].join(' ')}>
          <button style={{marginTop: '0'}}
                  className={[button.reset, button.cta, button.fullwidth].join(' ')}
                  onClick={() => this.toggleDisplay()}>Cacher itinéraire</button>
          <ItineraryContainer datas={this.props.itinerary} />
          <ItinerarySummary datas={this.props.itinerary} />
        </div>
      </section>
    );
  }
}
