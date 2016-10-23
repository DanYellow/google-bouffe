import 'babel-polyfill';
import React from 'react';
import Helmet from "react-helmet";

import styles from './../../stylesheets/details-view.css'

import DetailsRestaurant from './DetailsRestaurant'
import DetailsDigitas from './DetailsDigitas'


/**
 * @class A container for classes DetailsRestaurant and DetailsDigitas
 */
export default class DetailsView extends React.Component {
  render() {
    let DetailsView = (this.props.location.pathname.indexOf('digitas') > -1 || this.props.noResult) ? DetailsDigitas : DetailsRestaurant;

    return (
      <DetailsView restaurant={this.props.restaurant} itinerary={this.props.itinerary} />
    )
  }
}
