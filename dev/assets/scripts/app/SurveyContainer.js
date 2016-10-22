import 'babel-polyfill';
import React, {Component} from 'react';

import _ from 'lodash';

import Survey from './Survey'
import SurveyResults from './SurveyResults'

import styles from './../../stylesheets/survey.css'
import map from './../../stylesheets/map.css'


export default class SurveyContainer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      survey: {},
      anErrorOccured: false,
      dots: 0,
      isResultPage: (this.props.location.pathname.indexOf('results') > -1) ? true : false
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
    let APIURL = `${window.boBaseURL}/survey/${this.props.params.hash}`;
    if (this.state.isResultPage) {
      APIURL = `${window.boBaseURL}/survey/results/${this.props.params.hash}`;
    }

    fetch(APIURL, {
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
        this.setState({ anErrorOccured: true });
        clearTimeout(this.dotsTimer);
      }.bind(this));
  }

  _renderPlaceholderView() {
    let result = (<div>{ 'Chargement' + '.'.repeat(this.state.dots) }</div>)
    if (this.state.anErrorOccured) {
      result = (<div className={styles['survey-error']}>
        <h1>Une erreur est survenue</h1>
        <p>Ce sondage ne doit probablement plus exister</p>
        <a href="/#/list/digitaslbi">Retour à la sélection</a>
      </div>);
    }

    return result;
  }

  _renderSurvey() {
    return (<Survey {...this.state.survey} />)
  }

  _renderSurveyResults() {
    return (<SurveyResults results={this.state.survey} />)
  }

  render() {
    let content = this._renderSurvey();
    
    if (this.state.isResultPage) {
      content = this._renderSurveyResults();
    }

    if (!Object.keys(this.state.survey).length) {
      content = this._renderPlaceholderView();
    }
    
    return (
      <section className={map.map}>
        { content }
      </section>
    )
  }
}

