import 'babel-polyfill';
import React from 'react';


export default class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>Google Bouffe</h1>
        <p>
          La meilleure carte pour savoir où manger à midi <br/>
          Concoctée avec goût par les membres de <span>l’équipe La Poste</span> qui ont du goût
        </p>
      </header>
    )
  }
}

