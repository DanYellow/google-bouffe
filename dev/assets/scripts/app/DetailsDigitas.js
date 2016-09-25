import 'babel-polyfill';
import React from 'react';

import styles from './../../stylesheets/details-view.css'

import TextGenerator from './TextGenerator'

export default class DetailsDigitas extends React.Component {
  constructor(props) {
    super(props);

    this.RANDOMWORDS = [
      'une Agence', 'une agence',
      'du numérique', 'du digital',
      'de la direction par de la donnée utilisateur', 'du kimchi',
      'un gif audio', 'une image sonore',
    ];

    this.FLIPGIFS = [
      'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
      'https://media.giphy.com/media/3osxYamKD88c6pXdfO/giphy.gif',
      'https://media.giphy.com/media/CzQ9Kl1UIt8hG/giphy.gif',
      'https://media.giphy.com/media/xT8qB436gZpXdBw304/giphy.gif',
    ];

    this.state = {
      description: this.getRandomDescription()
    }
  }

  // Everytime the component is mounted, we change Digitas' description
  componentWillMount() {
    this.randomDescription();
  }

  randomDescription () {
    this.setState({description: this.getRandomDescription() })
  }

  getRandomDescription () {
    return this.props.restaurant.original_description.replace("__placeholder1__", this.RANDOMWORDS[Math.floor(Math.random() * this.RANDOMWORDS.length)]).replace("__placeholder2__", this.RANDOMWORDS[Math.floor(Math.random() * this.RANDOMWORDS.length)]); 
  }

  render() {
    var tags = null;
    if (this.props.restaurant.tags.length) {
      tags = 
        <ul className={styles.tags}>
            {this.props.restaurant.tags.map(function(tag, index) {
              return <li key={ Date.now() + index } className={[styles.tag, styles.rainbow].join(' ')} title={ window.tagsRef[tag].description }>{ window.tagsRef[tag].title || "Meilleur restaurant ever" }</li>;
          }) }
        </ul>
    }

    var description = this.state.description;
    if (description) {
      description = `‘‘${description}’’`
    }

    return (
      <section className={styles.container}>
        <svg width="0" height="0">
          <defs>
            <clipPath id="myClip">
              <circle cx="52" cy="52" r="52"/>
            </clipPath>
          </defs>
        </svg>
        <header>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }} >
            <div className={styles["flip-container"]} >
              <div className={styles["flipper"]}>
                <div className={styles["front"]}>
                  <img src={require('../../images/simple_logo_digitas.png')} width={105} />
                </div>
                <div className={styles["back"]}>
                  <img src={this.FLIPGIFS[Math.floor(Math.random() * this.FLIPGIFS.length)]} className={styles['clip-svg']} height={105} />
                </div>
              </div>
            </div>
          </div>

          <h1 className={styles.title}>{this.props.restaurant.title}</h1>
          <p itemProp="streetAddress" className={styles.address}><span style={{ fontFamily: "'open_sanssemibold', Arial, sans-serif" }}>Adresse : </span>{this.props.restaurant.address}</p>
        </header>
        <blockquote onClick={() => this.randomDescription()} itemProp="description" className={styles.description}>{ description }</blockquote>
        { tags }
      </section>
    );
  }
}