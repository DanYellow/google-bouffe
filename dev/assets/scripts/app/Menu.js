import 'babel-polyfill';
import React from 'react';

import { Link } from 'react-router';

import styles from './../../stylesheets/menu.css'


const ACTIVE = {
  borderBottom: '3px solid #da032c',
  color: '#da032c'
}

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let slugURL = (Object.getOwnPropertyNames(this.props.routeParams).length > 0) ? this.props.routeParams["slug"] : "digitaslbi";
    
    return (
      <nav className={styles.menu}>
        <Link target="_self" to={"/map/" + slugURL} activeStyle={ACTIVE}>Carte</Link>
        <Link target="_self" to={["/list/" + slugURL, "/list"]} activeStyle={ACTIVE}>Liste</Link>
      </nav>
    )
  }
}