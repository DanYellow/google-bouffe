import 'babel-polyfill';
import React from 'react';


export default class TextGenerator extends React.Component {
  constructor(props) {
    super(props);

    this.RANDOMWORDS = [
      'une Agence', 'une agence',
      'du numérique', 'du digital',
      'de la direction par de la donnée utilisateur', 'du kimchi',
      'un gif audio', 'une image sonore',
    ];

    this.state = {
      text: this.getRandomDescription()
    }
  }

  randomDescription () {
    this.setState({text: this.getRandomDescription() })
  }

  getRandomDescription () {
    return this.RANDOMWORDS[Math.floor(Math.random() * this.RANDOMWORDS.length)];
  }

  render() {
    return (<span style={styles.text} onClick={ () => this.randomDescription() }>{this.state.text}</span>)
    // return React.createElement('span', {}, 'Hello!');
  }
}

const styles = {
  text: {
    color: '#da032c',
    fontFamily: "'open_sanssemibold', Arial, sans-serif"
  }
}