import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'

import Map from './map'

import './../stylesheets/reset.css'

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
    description: "Pas de viandes, pas de poisson"
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
    description: "Propose des repas sans viandes, poissons, oeufs, fromages, produit exploitantn les animaux"
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
    description: "La nourriture n'est pas très diététique"
  },
  '15': {
    title: "Sandwichs",
    description: ""
  }
}

const markers = [
  {
    position: {
      lat: 48.850861,
      lng: 2.377926,
    },
    title: `East mamma`,
    props: {
      description: 'Restaurant Italien. Produits de qualité pour des plats de qualité',
      address: '33 Rue du Faubourg Saint-Antoine, 75011 Paris',
      tags: ["8", "13", "5"],
      budgetScale: 4
    }
  }, {
    position: {
      lat: 48.857127,
      lng: 2.378408
    },
    title: `Chez Aline`,
    props: {
      description: 'Traiteur / Sandicherie.',
      address: '85 Rue de la Roquette, 75011 Paris',
      tags: ["1", "8", "9"],
      budgetScale: 8
    }
  }, {
    position: {
      lat: 48.853131,
      lng: 2.376798
    },
    title: `Starvin Joe`,
    props: {
      description: 'Burger',
      address: '42 Rue de Charonne, 75011 Paris',
      tags: ["12", "3", "5"],
      budgetScale: 5
    }
  }, {
    position: {
      lat: 48.853272,
      lng: 2.379049
    },
    title: `Chez Gladines`,
    props: {
      description: 'Restauration du typique du Sud de la France. Plats copieux pour des prix raisonnable',
      address: '64 Rue de Charonne, 75011 Paris',
      tags: ["8", "5"],
      budgetScale: 3
    }
  }, {
    position: {
      lat: 48.8568045,
      lng: 2.3779875
    },
    title: `La fée verte`,
    props: {
      description: '',
      address: '108 rue de la Roquette, 75011 Paris',
      budgetScale: 5
    }
  }, {
    position: {
      lat: 48.8544782,
      lng: 2.3711407
    },
    title: `Momji`,
    props: {
      description: '',
      address: '20 Rue Daval, 75011 Paris',
      tags: ["7"],
      budgetScale: 5
    }
  }, {
    position: {
      lat: 48.8544782,
      lng: 2.3711407
    },
    title: `Café des anges`,
    props: {
      description: '',
      address: '66 Rue de la Roquette, 75011 Paris',
      budgetScale: 5
    }
  }, {
    position: {
      lat: 48.8572733,
      lng: 2.3732052
    },
    title: `La Marelle`,
    props: {
      description: '',
      address: '20 Rue Breguet, 75011 Paris',
      budgetScale: 5
    }
  }, {
    position: {
      lat: 48.854488,
      lng: 2.37082
    },
    title: `Jun'Sushi`,
    props: {
      description: 'Buffet à volonté sur place',
      address: '18 Rue Daval, 75011 Paris',
      tags: ["7"],
      budgetScale: 5
    }
  }, {
    position: {
      lat: 48.853097,
      lng: 2.378275
    },
    title: `Le Chalet Savoyard`,
    props: {
      description: 'Raclette Suisse',
      address: '58 Rue de Charonne, 75011 Paris',
      budgetScale: 5
    }
  }, {
    position: {
      lat: 48.853663,
      lng: 2.372831
    },
    title: `L'île aux Bokits`,
    props: {
      description: 'Sandwiches à la mode tropicale : les bokits',
      address: '12 Rue de Lappe, 75011 Paris',
      tags: ["3", "4", "1"],
      budgetScale: 5
    }
  }, {
    position: {
      lat: 48.857511, 
      lng: 2.373364
    },
    title: `Digitas`,
    icon: require(`./logo-digitas.png`),
    zIndex: 999999,
    props: {
      filtrabled: false
    }
  }
]


render(
  <Map markers={markers} defaultCenter={{ lat: 48.857511, lng: 2.373364 }} />,
  document.getElementById('root')
)
