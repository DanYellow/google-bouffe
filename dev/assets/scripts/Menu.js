import 'babel-polyfill';
import React from 'react';
import Radium from 'radium';


import styles from './../stylesheets/menu.css'

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
        <button onClick={this.setDisplayMode.bind(this, 'map')} >Carte</button>
        <button onClick={this.setDisplayMode.bind(this, 'list')} >Liste</button>
      </nav>
    )
  }
}