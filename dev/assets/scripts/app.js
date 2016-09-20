import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'

import GMap from './gmap'

import './../stylesheets/reset.css'

const markers = [
  {
    position: {
      lat: 48.850861,
      lng: 2.377926,
    },
    title: `East mamma`,
    description: 'Restaurant Italien. Produits de qualité pour des plats de qualité',
    address: '33 Rue du Faubourg Saint-Antoine, 75011 Paris',
    jeanScale: 6
  }, {
    position: {
      lat: 48.857127,
      lng: 2.378408
    },
    title: `Chez Aline`,
    description: 'Traiteur / Sandicherie.',
    address: '85 Rue de la Roquette, 75011 Paris',
    jeanScale: 4
  }, {
    position: {
      lat: 48.853131,
      lng: 2.376798
    },
    title: `Starvin Joe`,
    description: 'Burger',
    address: '42 Rue de Charonne, 75011 Paris'
  }, {
    position: {
      lat: 48.853272,
      lng: 2.379049
    },
    title: `Chez Gladines`,
    description: 'Restauration du typique du Sud de la France. Plats copieux pour des prix raisonnable',
    address: '64 Rue de Charonne, 75011 Paris',

  }, {
    position: {
      lat: 48.8568045,
      lng: 2.3779875
    },
    title: `La fée verte`,
    description: '',
    address: '108 rue de la Roquette, 75011 Paris'
  }, {
    position: {
      lat: 48.8544782,
      lng: 2.3711407
    },
    title: `Momji`,
    description: '',
    address: '20 Rue Daval, 75011 Paris'
  }, {
    position: {
      lat: 48.8544782,
      lng: 2.3711407
    },
    title: `Café des anges`,
    description: '',
    address: '66 Rue de la Roquette, 75011 Paris'
  }, {
    position: {
      lat: 48.8572733,
      lng: 2.3732052
    },
    title: `La Marelle`,
    description: '',
    address: '20 Rue Breguet, 75011 Paris'
  }, {
    position: {
      lat: 48.854488,
      lng: 2.37082
    },
    title: `Jun'Sushi`,
    description: 'Buffet à volonté sur place',
    address: '18 Rue Daval, 75011 Paris'
  }, {
    position: {
      lat: 48.853097,
      lng: 2.378275
    },
    title: `Le Chalet Savoyard`,
    description: 'Raclette Suisse',
    address: '58 Rue de Charonne, 75011 Paris'
  },{
    position: {
      lat: 48.857511, 
      lng: 2.373364
    },
    title: `Digitas`,
    icon: require(`./logo-digitas.png`),
    filtrabled: false
  }


]


render(
  <GMap markers={markers} />,
  document.getElementById('root')
)
