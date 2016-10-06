import 'babel-polyfill';
import React from 'react';

import { Link } from 'react-router';

import button from './../../stylesheets/button.css';


export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canCreateSurvey: false,
      urlSurvey: window.localStorage.getItem('survey_url') || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const anwsers = JSON.parse(window.localStorage.getItem('survey_anwsers')) || []
    if (anwsers.length > 1) {
      this.setState({ canCreateSurvey: true });
    } else {
      this.setState({ canCreateSurvey: false });
    }
  }

  createSurvey() {
    fetch(`${window.boBaseURL}/survey/create?datas=${encodeURIComponent(window.localStorage.getItem('survey_anwsers'))}`, {
        method: 'POST',
      })
      .then(response => response.json())
      .then(function(json) {
        localStorage.clear('survey_anwsers');
        this.setState({ urlSurvey: json.response.url });
        window.localStorage.setItem('survey_url', json.response.url);
      }.bind(this));
  }

  render() {
    let buttonCreateSurvey = null;
    let contentURLSurvey = null;

    if(this.state.canCreateSurvey) {
      buttonCreateSurvey = (<button type="action" className={[button.reset, button.cta].join(' ')} onClick={() => this.createSurvey()}>Créer mon sondage</button>)
    }

    if (this.state.urlSurvey) {
      const urlSurveyComplete = `${window.baseURL}${this.state.urlSurvey}`;
      contentURLSurvey = <p>Lien du dernier sondage : <Link target="_self" to={"/"}>Retour à l'accueil</Link> <a href={urlSurveyComplete}>{this.state.urlSurvey}</a></p>
    }

    return (
      <header style={styles.header}>
        <h1>Google Bouffe</h1>
        <p>
          La meilleure carte pour savoir où manger à midi <br/>
          Concoctée avec goût par les membres de <span>l’équipe La Poste</span> qui ont du goût
        </p>
        { buttonCreateSurvey }
        { contentURLSurvey }
      </header>
    )
  }
}

const styles = {
  header: {
    paddingBottom: '15px'
  }
}

