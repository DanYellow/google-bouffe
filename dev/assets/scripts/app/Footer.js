import 'babel-polyfill';
import React from 'react';
import { Link } from 'react-router';

import styles from './../../stylesheets/footer.css'

const ACTIVE = {
  color: '#da032c'
}

export default function Footer() {
	return (
    <footer className={styles.footer}>
      <Link target="_self" to={"/"} activeStyle={ACTIVE}>Retour à l'accueil</Link>
      <Link target="_self" title="Ajouter ma suggestion" to={"/suggestion"} activeStyle={ACTIVE}>J'ai aussi du goût !</Link>
      <a title="Je n'accepte pas les demandes de traction 🎉 Fourchette le projet" href="https://github.com/DanYellow/google-bouffe/tree/router" target="_blank">🎉 Code source disponible sur gîtehub 🎉</a>
    </footer>
  )
}