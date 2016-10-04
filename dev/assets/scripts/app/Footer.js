import 'babel-polyfill';
import React from 'react';
import { Link } from 'react-router';

import styles from './../../stylesheets/footer.css'

export default function Footer() {
	return (
    <footer className={styles.footer}>
      <a title="Je n'accepte pas les demandes de traction 🎉 Fourchette le projet" href="https://github.com/DanYellow/google-bouffe/tree/router" target="_blank">🎉 Code source disponible sur gîtehub 🎉</a>
      <Link target="_self" title="Ajouter ma suggestion" to={"/suggestion"}>J'ai aussi du goût !</Link>
      <Link target="_self" to={"/"}>Retour à l'accueil</Link>
    </footer>
  )
}