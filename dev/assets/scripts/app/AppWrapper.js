import 'babel-polyfill';
import React from 'react';


import Header from './Header'
import Footer from './Footer'
import App from './App'
import Menu from './Menu'

import styles from './../../stylesheets/map.css'

export default class AppWrapper extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
