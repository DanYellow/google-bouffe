import 'babel-polyfill';
import React from 'react';

import Header from './Header'
import Menu from './Menu'
import ListRestaurants from './ListRestaurants'
import Map from './Map'

import Utils from './Utils'

import styles from './../../stylesheets/map.css'


window.tagsRef = {
  '1': {
    title: "À emporter",
    description: "Permet de prendre son déjeuner à emporter"
  },
  '2': {
    title: "Costaud 💪",
    description: "Copieux sont les plats (hyperbate)"
  },
  '3': {
    title: "Végétarien",
    description: "Propose au moins un plat sans viande, sans poisson"
  },
  '4': {
    title: "C'est la fin du mois",
    description: "Pour les budgets minis"
  },
  '5': {
    title: "Collègues nombreux",
    description: "Permet de manger à plusieurs sur place (+ de 6)"
  },
  '6': {
    title: "Vegan / Végétalien",
    description: "Propose au moins un plat sans viandes/poissons/oeufs/fromages. Aucun produit issu de l'exploitation animale"
  },
  '7': {
    title: "Asiatique",
    description: "Chinois, Japonais, Thaïlandais, Indien"
  },
  '8': {
    title: "Traditionnel",
    description: "Cuisine traditionnelle"
  },
  '9': {
    title: "Traiteur",
    description: "Nourriture à la pesée"
  },
  '10': {
    title: "A la croisée des goûts",
    description: "Propose des croisements étonnant et/ou des produits atypiques"
  },
  '11': {
    title: "Buffet à volonté",
    description: "Manger ce que vous pouvez"
  },
  '12': {
    title: "Burger",
    description: "🍔 B.U.R.G.E.R. 🍔"
  },
  '13': {
    title: "On fait la queue",
    description: "Pas de réservation possible"
  },
  '14': {
    title: "Cheat meal",
    description: "La nourriture n'est pas très diététique. Mais c'est bon petit plaisir, alors c'est pardonné"
  },
  '15': {
    title: "Sandwichs",
    description: "Le classique"
  },
  '16': {
    title: "Apéro 🍷",
    description: "Idéal pour un after-work"
  },
  '17': {
    title: "Happy hour",
    description: "Propose des prix préférentiels sur l'alcool durant une période"
  },
  '18': {
    title: "Pas de CB",
    description: "Le restaurateur ne propose pas le paiement par Carte Bleue"
  },
  '18': {
    title: "🍕",
    description: "Pizze !"
  },


  '150': {
    title: "Unicorns 🌈",
    description: ""
  },
  '151': {
    title: "Paris Bastille",
    description: "Bastille Paris"
  },
  '152': {
    title: "Crossfit® - Bad form is the norm",
    description: "ZEEEEEEEEEEEERO !"
  },
  '153': {
    title: "#Pas d'escaliers",
    description: "...NO GAINS !"
  },
  '154': {
    title: "Licornets",
    description: "Quand est-ce qu'ils reviennent ?"
  },
  '155': {
    title: "Install Gentoo",
    description: ""
  }
}

const markers = require("json!./../../datas/restaurants-list.json");
markers.push({
    "position": {
      "lat": 48.857927,
      "lng": 2.373118
    },
    "title": "DigitasLBi",
    icon: require("./../../images/logo-digitas.png"),
    zIndex: 999999,
    "props": {
      filtrabled: false,
      "description": "Mélange détonant entre __placeholder1__ et __placeholder2__",
      "original_description": "Mélange détonant entre __placeholder1__ et __placeholder2__",
      "address": "30-34 Rue du Chemin Vert, 75011 Paris",
      "tags": [150, 151, 152, 153, 154, 155],
    } 
  }
);

markers.map(function(marker) {
  return marker.props.slug = Utils.slugify(marker.title)
});

markers.map(function(marker) {
  if (!marker.props.tags) {
    return marker.props.tags = [];
  }
});

/**
 * Filter restaurants to retrieve the restaurant w/
 * @param  {String} slug       [description]
 * @param  {Object} restaurant [description]
 * @return {Boolean}            [description]
 */
const getRestaurantForSlug = function (slug, restaurant) {
  return restaurant.props.slug === slug;
}


export default class App extends React.Component {
  constructor (props) {
    super(props);

    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsService = new google.maps.DirectionsService;

    this.currentRestaurant = {};
  }



  static defaultProps = {
    restaurants: markers
  }

  componentDidUpdate(nextProps) {
    // this.directionsDisplay.setMap(this.mapContainer.props.map);

    const self = this;

    this.directionsService.route({
      origin: {lat: 48.857927, lng: 2.373118}, // Digitas
      destination: this.currentRestaurant.position, // Restaurant position
      travelMode: google.maps.TravelMode.WALKING
    }, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        self.directionsDisplay.setDirections(response);

        console.log(self.directionsDisplay.directions.routes[0].legs[0].steps)
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  render() {
    let ViewDisplay = <ListRestaurants restaurants={this.props.restaurants} />

    if (this.props.route.path === 'map') {
      ViewDisplay = <Map markers={this.props.restaurants} />
    }

    let slug = this.props.params.slug;
    let noResult = false;
    this.currentRestaurant = this.props.restaurants.find(getRestaurantForSlug.bind(this, slug));
    if (!this.currentRestaurant) {
      this.currentRestaurant = this.props.restaurants.find(getRestaurantForSlug.bind(this, 'digitaslbi'));
      noResult = true;
    }
    
    this.currentRestaurant = Object.assign(this.currentRestaurant.props, { 
      title: this.currentRestaurant.title,
      position: this.currentRestaurant.position 
    });

    if (!this.currentRestaurant.tags) {
      this.currentRestaurant.tags = [];
    }

    return (
      <section className={styles.map}>
        <div style={{ height: '100%', flex: .65, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <Menu routeParams={this.props.params} />
          {ViewDisplay}
        </div>

        {this.props.children && React.cloneElement(this.props.children, { restaurant: this.currentRestaurant, noResult: noResult })}

      </section>
    );
  }
}

App.propTypes = {
  restaurants: React.PropTypes.array
}
