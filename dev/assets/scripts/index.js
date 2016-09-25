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

// https://medium.com/@dabit3/beginner-s-guide-to-react-router-53094349669#.kix0vbulz
// https://github.com/ReactTraining/react-router/issues/1857
// https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.roy5kvmre
// https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/

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
