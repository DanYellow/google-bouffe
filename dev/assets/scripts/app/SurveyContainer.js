import 'babel-polyfill';
import React from 'react';

import Survey from './Survey'

import styles from './../../stylesheets/survey.css'
import map from './../../stylesheets/map.css'


export default class SurveyContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      survey: {},
      anErrorOccured: false,
      dots: 0
    }

    this.dotsTimer = setInterval(() => {
      let dots = this.state.dots;
      if (this.state.dots > 2) {
        dots = 0;
      } else {
        dots++;
      }
      this.setState({ dots: dots });
    }, 750);
  }

  componentDidMount() {
    // Retrieve content survey
    fetch(`${window.boBaseURL}/survey/${this.props.params.hash}`, {
        mode: 'cors'
      })
      .then(response => response.json())
      .then(function(json) {
        if (json.response) {
          this.setState({ survey: json.response })
        } else {
          this.setState({ anErrorOccured: true });
        }
        clearTimeout(this.dotsTimer);
      }.bind(this)
      ).catch(function(error) {
        // console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        this.setState({ anErrorOccured: true });
        clearTimeout(this.dotsTimer);
      }.bind(this));
  }

  _renderPlaceholderView() {
    let result = (<div>{ 'Pending' + '.'.repeat(this.state.dots) }</div>)
    if (this.state.anErrorOccured) {
      result = (<div className={styles['survey-error']}>
        <h1>Une erreur est survenue</h1>
        <p>Ce sondage ne doit probablement plus exister</p>
        <a href="/#/list/digitaslbi">Retour à la sélection</a>
      </div>);
    }

    return result;
  }

  render() {
      if (!Object.keys(this.state.survey).length) {
        return this._renderPlaceholderView();
      }

      return (
        <section className={map.map}>
          <Survey {...this.state.survey} />
        </section>
      )
  }
}

