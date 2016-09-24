import 'babel-polyfill';
import React from 'react';

import styles from './../stylesheets/list.css'

export default class ListRestaurants extends React.Component {
  constructor(props) {
    super(props);
  }

  selectedRestaurant (restaurant) {
    this.props.selectedRestaurantCallback(0, restaurant)
  }

  render() {
    const extraClass = this.props.displayMode == 'map' ? null : 'show';

    return ( 
      <ul className={[styles.list, styles[extraClass]].join(' ')}> 
        {this.props.restaurants.map((restaurant, index) => {
            return <ListRestaurantsItem currentRestaurant={this.props.currentRestaurant} {...restaurant} key={ Date.now() + index } selectedRestaurantCallback={this.selectedRestaurant.bind(this)} />
          })}
      </ul>
    )
  }
}

ListRestaurants.defaultProps = {
  restaurants: []
}

ListRestaurants.propTypes = {
  restaurants: React.PropTypes.array
}

class ListRestaurantsItem extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Indicates which restaurant have been selected
   * @return null
   */
  selectedRestaurant() {
    this.props.selectedRestaurantCallback(this.props);
  }

  render() {
    return ( 
      <li style={active(this.props.currentRestaurant.title, this.props.title)}>
        <button onClick={() => this.selectedRestaurant()}>
          {this.props.title}
        </button>
      </li>
    )
  }
}

const active = function (currentType, thisType) {
  if (currentType === thisType) {
    return {
      borderLeft: '3px solid #da032c'
    }
  }
}
