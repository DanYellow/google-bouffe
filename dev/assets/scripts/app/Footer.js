import 'babel-polyfill';
import React from 'react';

import styles from './../../stylesheets/footer.css'

export default class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.footer}>
        <a title="Je n'accepte pas les PR 🎉 Forke le projet" href="https://github.com/DanYellow/google-bouffe/tree/router" target="_blank">🎉 Code source disponible sur gîtehub 🎉</a>
      </footer>
    )
  }
}
