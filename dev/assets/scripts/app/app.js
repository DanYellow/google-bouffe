import 'babel-polyfill';
import React from 'react';

import Header from './Header'
import Menu from './Menu'
import ListRestaurants from './ListRestaurants'
import Map from './Map'

import Utils from './Utils'

import styles from './../../stylesheets/map.css'

// const host = '10.224.70.237';
const host = '127.0.0.1';

window.boBaseURL = `http://${host}:8000`;
window.baseURL = `http://${host}:9009/#`;

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
    description: "La nourriture n'est pas très diététique. Mais c'est un bon petit plaisir, alors c'est pardonné"
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
    title: "Pas de CB 💳",
    description: "Le restaurateur ne propose pas le paiement par Carte Bleue"
  },
  '18': {
    title: "🍕(Pizza)",
    description: "Pizze !"
  },
  '19': {
    title: "Salades",
    description: ""
  },
  '20': {
    title: "Brasserie",
    description: ""
  },
  '21': {
    title: "Tapas",
    description: "Petits amuse-gueules d'origine espagnole composées de différents ingrédients"
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

const markers = require('json!./../../datas/restaurants-list.json');
// Order alphabetically restaurants
markers.sort(function(a, b){
  if(a.title < b.title) return -1;
  if(a.title > b.title) return 1;
  return 0;
})

markers.push({
    'position': {
      'lat': 48.858042,
      'lng': 2.373359
    },
    'title': 'DigitasLBi',
    icon: require('./../../images/logo-digitas.png'),
    zIndex: 999999,
    'props': {
      filtrabled: false,
      'description': 'Mélange détonant entre __placeholder1__ et __placeholder2__',
      'original_description': 'Mélange détonant entre __placeholder1__ et __placeholder2__',
      'address': '30-34 Rue du Chemin Vert, 75011 Paris',
      'tags': [150, 151, 152, 153, 154, 155],
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

    this.directionsService = new google.maps.DirectionsService;

    this.noResult = false;

    this.state = {
      currentRestaurantItinerary: [],
      currentRestaurantDirections: {},
      currentRestaurant: {}
    }
  }

  componentWillMount () {
    this.getNextRestaurant(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.getNextRestaurant(nextProps)
  }

  getNextRestaurant (props) {
    let slug = props.params.slug;
    
    let currentRestaurant = props.restaurants.find(getRestaurantForSlug.bind(this, slug));
    if (!currentRestaurant) {
      currentRestaurant = props.restaurants.find(getRestaurantForSlug.bind(this, 'digitaslbi'));
      this.noResult = true;
    } else {
      this.noResult = false;
    }
    
    currentRestaurant = Object.assign(currentRestaurant.props, { 
      title: currentRestaurant.title,
      position: currentRestaurant.position 
    });

    if (!currentRestaurant.tags) {
      currentRestaurant.tags = [];
    }

    this.setState({currentRestaurant: currentRestaurant});

    const self = this;
    this.directionsService.route({
      origin: {lat: 48.857927, lng: 2.373118}, // Digitas
      destination: currentRestaurant.position, // Restaurant position
      travelMode: google.maps.TravelMode.WALKING
    }, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        self.setState({ 
          currentRestaurantItinerary: response.routes[0].legs[0].steps,
          currentRestaurantDirections: response
        })
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  static defaultProps = {
    restaurants: markers
  }


  render() {
    let ViewDisplay = <ListRestaurants restaurants={this.props.restaurants} />

    if (this.props.route.path === 'map') {
      ViewDisplay = <Map markers={this.props.restaurants} directions={this.state.currentRestaurantDirections} />
    }

    return (
      <section className={styles.map}>
        <div style={{ height: '100%', flex: .65, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <Menu routeParams={this.props.params} />
          {ViewDisplay}
        </div>

        {this.props.children && React.cloneElement(this.props.children, { restaurant: this.state.currentRestaurant, noResult: this.noResult, itinerary: this.state.currentRestaurantItinerary })}

      </section>
    );
  }
}

App.propTypes = {
  restaurants: React.PropTypes.array
}
