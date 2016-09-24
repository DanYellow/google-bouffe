import 'babel-polyfill';
import React from 'react';

import { Link } from 'react-router'

import styles from './../../stylesheets/menu.css'


const ACTIVE = {
  borderBottom: '3px solid #da032c',
  color: '#da032c'
}

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  setDisplayMode (type) {
    this.props.callbackClick(type)
  }

  render() {
    return (  
      <nav className={styles.menu}>
        <Link to="map" activeStyle={ACTIVE}>Carte</Link>
        <Link to="list" activeStyle={ACTIVE}>Liste</Link>
      </nav>
    )
  }
}
