import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'

import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router'

require('./../stylesheets/reset.css');
require('./../stylesheets/base.css');

import AppWrapper from './app/AppWrapper'
import App from './app/App'
import DetailsView from './app/DetailsView'
import NotFound from './app/404NotFound'


render(
  <Router history={hashHistory}>
    <Route path='/' component={AppWrapper}>
      <IndexRedirect to="list" />
      <Route path='map' component={(props) => (<App {...props} />)}>
        <IndexRoute component={DetailsView} />
        <Route path=':slug' component={DetailsView} />
      </Route>
      <Route path='list' component={(props) => (<App {...props}/>)}>
        <IndexRoute component={DetailsView} />
        <Route path=':slug' component={DetailsView} />
      </Route>
      <Route path='*' component={NotFound}/>
    </Route>
  </Router>,
  document.getElementById('root')
)
