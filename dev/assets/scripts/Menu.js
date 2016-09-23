import 'babel-polyfill';
import React from 'react';
import Radium from 'radium';


import styles from './../stylesheets/menu.css'

export default class Menu extends React.Component {
  constructor(props) {
    super(props);

    console.log(props)
  }

  hello () {
    this.props.callbackClick("map")
  }

  render() {
    return ( 
      <nav className={styles.menu}>
        <button onClick={this.hello.bind(this)} >Carte</button>
        <button onClick={this.hello.bind(this)} >Liste</button>
      </nav>
    )
  }
}