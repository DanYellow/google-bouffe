import 'babel-polyfill';
import React from 'react';

import { Link } from 'react-router';


const NotFound = () => {
  return (
    <div>
      <h1>404... This page is not found!</h1>
      <Link to={'/list/'}>Retour à l'accueil</Link>
    </div>
  )
}

export default NotFound;