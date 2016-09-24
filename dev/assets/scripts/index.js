import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'

import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router'

require('./../stylesheets/reset.css');
require('./../stylesheets/base.css');

import AppWrapper from './app/AppWrapper'
import App from './app/App'
import DetailsDigitas from './app/DetailsDigitas'
import DetailsRestaurant from './app/DetailsRestaurant'

// https://medium.com/@dabit3/beginner-s-guide-to-react-router-53094349669#.kix0vbulz
// https://github.com/ReactTraining/react-router/issues/1857


const NotFound = () => (
  <h1>404.. This page is not found!</h1>)

render(
  <Router history={hashHistory}>
    <Route path='/' component={AppWrapper}>
      <IndexRedirect to="list" />
      <Route path='map' component={(props) => (<App {...props} />)}>
        <IndexRoute component={DetailsDigitas} />
        <Route path='digitaslbi' component={DetailsDigitas} />
        <Route path=':slug' component={DetailsRestaurant} />
      </Route>
      <Route path='list' component={(props) => (<App {...props}/>)}>
        <IndexRoute component={DetailsDigitas} />
        <Route path='digitaslbi' component={DetailsDigitas} />
        <Route path=':slug' component={DetailsRestaurant} />
      </Route>
      <Route path='*' component={NotFound}/>
    </Route>
  </Router>,
  document.getElementById('root')
)
