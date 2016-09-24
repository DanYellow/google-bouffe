import 'babel-polyfill';
import React from 'react';

import { Link, withRouter } from 'react-router';

import styles from './../../stylesheets/menu.css'


const ACTIVE = {
  borderBottom: '3px solid #da032c',
  color: '#da032c'
}

@withRouter
export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props)
    return (  
      <nav className={styles.menu}>
        <Link to={"map/" + this.props.routeParams["slug"]} activeStyle={ACTIVE}>Carte</Link>
        <Link to={"list/" + this.props.routeParams["slug"]} activeStyle={ACTIVE}>Liste</Link>
      </nav>
    )
  }
}
