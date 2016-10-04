import 'babel-polyfill';
import React from 'react';

import button from './../../stylesheets/button.css'

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canCreateSurvey: false,
      urlSurvey: undefined
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
        method: 'GET',
      })
      .then(response => response.json())
      .then(function(json) {
        localStorage.clear();
        this.setState({ urlSurvey: json.response.url });
      }.bind(this))
  }

  render() {
    let buttonCreateSurvey = null;
    let contentURLSurvey = null;

    if(this.state.canCreateSurvey) {
      buttonCreateSurvey = (<button type="action" className={[button.reset, button.cta].join(' ')} onClick={() => this.createSurvey()}>Créer mon sondage</button>)
    }

    if (this.state.urlSurvey) {
      const urlSurveyComplete = `${window.baseURL}${this.state.urlSurvey}`;
      contentURLSurvey = <p>Lien du dernier sondage : <a href={urlSurveyComplete}>{this.state.urlSurvey}</a></p>
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

