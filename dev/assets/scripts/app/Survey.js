import 'babel-polyfill';
import React from 'react';
import uuid from 'node-uuid';

import _ from 'lodash';

import button from './../../stylesheets/button.css'
import styles from './../../stylesheets/survey.css'


export default class Survey extends React.Component {
  constructor(props) {
    super(props);

    // Avoid multiple votes
    this.voteClickDebounce = _.debounce(this.vote.bind(this), 1000, true);
    this.state = {
      voteMessage: undefined,
      cheatCount: 0
    }
  }

  /**
   * Vote for an restaurant
   * @param  {String} url Vote url
   * @return null
   */
  vote (url) {
    // 
    fetch(url, {
        method: 'post'
      })
      .then(response => response.json())
      .then(json =>
        this.setState({ voteMessage: json.response })
      )
  }


  cheat () {
    this.setState({ voteMessage: undefined, cheatCount: this.state.cheatCount + 1 });
  }


  render() {
    console.log('regerger')
    let content = (
      <div className={styles.survey}>
        <h1>{this.props.question || 'Ce midi, on se fait quoi ?'}</h1>
        <section className={styles.answers}>
          {this.props.answers.map((answer, index) => {
            return <Answer voteCallback={this.voteClickDebounce} surveyHash={this.props.hash} {...answer} key={uuid.v1()} />
          })}
        </section>
      </div>
    );

    if (this.state.voteMessage) {
      content = (
        <div>
          <h1 className={styles.voted}>{this.state.voteMessage}</h1>
          <button className={[button.reset, button.cta].join(' ')} onClick={() => this.cheat()}>{'Re-'.repeat(this.state.cheatCount)}Truquer les votes</button>
        </div>
      );
    }

    return (
      <div>
        { content }
      </div>
    )
  }
}


class Answer extends React.Component {
  /**
   * [voteClick description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  voteClick(e) {
    this.props.voteCallback(`${window.boBaseURL}${e.currentTarget.dataset['voteurl']}`);
  }

  render() {
    let {response, URL, surveyHash, id} = this.props;
    const voteURL = `/survey/${surveyHash}/${id}`;

    return (
      <article>
        <p style={stylesAnswer.response}>{ response }</p>
        <a style={stylesAnswer.url} href={URL} target="_blank">Voir fiche</a>
        <button className={[button.reset, button.cta].join(' ')} data-voteurl={voteURL} onClick={(e) => this.voteClick(e)}>Je vote pour !</button>
      </article>
    );
  }
}

const stylesAnswer = {
  url: {
    color: '#da032c'
  },
  response: {
    fontSize: '22px',
    fontFamily: "'open_sansregular', Arial, sans-serif",
    marginBottom: '7px'
  }
}