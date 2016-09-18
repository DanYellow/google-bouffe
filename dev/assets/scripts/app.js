import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'

import GMap from './gmap'

const markers = [{
  position: {
    lat: 48.850861,
    lng: 2.377926,
  },
  key: `Taiwan`,
  defaultAnimation: 2,
}]

render(
  <GMap markers={markers} />,
  document.getElementById('root')
)
