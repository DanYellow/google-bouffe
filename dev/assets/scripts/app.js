import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'

require('./../stylesheets/reset.css');
require('./../stylesheets/base.css');

import Map from './map'


window.tagsRef = {
  '1': {
    title: "À emporter",
    description: "Permet de prendre son déjeuner à emporter"
  },
  '2': {
    title: "Costaud",
    description: "Copieux sont les plats (hyperbate)"
  },
  '3': {
    title: "Végétarien",
    description: "Propose des plats sans viande, sans poisson"
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
    description: "Propose des repas sans viandes, poissons, oeufs, fromages. Aucun produit issu de l'exploitation animale"
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
    description: "B.U.R.G.E.R."
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
    title: "Apéro",
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



  '150': {
    title: "Unicorns",
    description: ""
  },
  '151': {
    title: "Paris Bastille",
    description: ""
  },
  '152': {
    title: "Crossfit - Bad form is the norm",
    description: "ZEEEEEEEEEEEERO !"
  },
  '153': {
    title: "#Pas d'escaliers",
    description: "...NO GAINS !"
  },
  '154': {
    title: "Licornets",
    description: ""
  },
  '155': {
    title: "Unicorns",
    description: ""
  }
}
 
const markers = require("json!./restaurants-list.json");

markers.push({
    "position": {
      "lat": 48.857927,
      "lng": 2.373118
    },
    "title": "DigitasLBi",
    icon: require("./logo-digitas.png"),
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


render(
  <Map markers={markers} defaultCenter={{ lat: 48.857511, lng: 2.373364 }} />,
  document.getElementById('root')
)
