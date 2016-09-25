import 'babel-polyfill';
import React from 'react';
import { Link } from 'react-router'

import styles from './../../stylesheets/list.css'

export default class ListRestaurants extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return ( 
      <ul className={styles.list}> 
        {this.props.restaurants.map((restaurant, index) => {
            return <ListRestaurantsItem currentRestaurant={this.props.currentRestaurant} {...restaurant} key={ Date.now() + index } />
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


const ACTIVE = {
  borderLeft: '3px solid #da032c'
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
    const tags = this.props.props.tags.map(function(tag) {
      return window.tagsRef[tag].title
    }).slice(0,3);
    return ( 
      <li>
        <Link to={'/list/' + this.props.props.slug} activeStyle={ACTIVE}>
          <span>{this.props.title}</span>
          
          {tags.length > 0 && <p>Tags : {tags.join(', ')}</p>}
        </Link>
      </li>
    )
  }
}
