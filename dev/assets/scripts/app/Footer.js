import 'babel-polyfill';
import React from 'react';


import styles from './../../stylesheets/footer.css'

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <a href="#"> Code source disponible sur github </a> | <span>Réalisé par un développeur non</span>
      </footer>
    )
  }
}

