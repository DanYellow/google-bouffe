import 'babel-polyfill';
import React from 'react';
import Radium from 'radium';


import styles from './../stylesheets/menu.css'

export default class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMode: 'map'
    }
  }

  setDisplayMode (type) {
    this.props.callbackClick(type)
  }

  render() {
    const extraClass = this.props.displayMode == 'map' ? null : 'hide';

    return ( 
      <nav className={styles.menu}>
        <button style={active(this.props.displayMode, 'map')} onClick={this.setDisplayMode.bind(this, 'map')} >Carte</button>
        <button style={active(this.props.displayMode, 'list')} onClick={this.setDisplayMode.bind(this, 'list')} >Liste</button>
      </nav>
    )
  }
}

const active = function (currentType, thisType) {
  if (currentType === thisType) {
    return {
      borderBottom: '3px solid #da032c'
    }
  }
}
