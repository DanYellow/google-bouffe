import 'babel-polyfill';
import React from 'react';


import styles from './../../stylesheets/details-view.css'

import DetailsRestaurant from './DetailsRestaurant'
import DetailsDigitas from './DetailsDigitas'

export default class DetailsView extends React.Component {
  render() {
    let DetailsView = (this.props.location.pathname.indexOf('digitas') > -1 || this.props.noResult) ? DetailsDigitas : DetailsRestaurant;
    return React.createElement(DetailsView, {restaurant: this.props.restaurant});
  }
}